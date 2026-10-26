#!/usr/bin/env python3
"""End-to-end checks for UAS Fieldnotes.

Serve the repository through HTTP (default http://127.0.0.1:8770), then run:
    python tests/uas-browser.py

Requires Python Playwright and Chromium installed outside the repository.
Set BASE_URL, CHROMIUM_PATH, or SCREENSHOT_DIR to override defaults.
No external reference websites are fetched by these checks.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess

from playwright.sync_api import sync_playwright, expect


ROOT = Path(__file__).resolve().parents[1]
BASE = os.environ.get("BASE_URL", "http://127.0.0.1:8770").rstrip("/")
ARTIFACTS = Path(os.environ.get("SCREENSHOT_DIR", "/tmp/uas-qa"))
KEY = "mathjock.uas.progress.v1"
VIEWS = ["overview", "lessons", "atlas", "study", "cfar", "network", "practice", "reference"]
ARTIFACTS.mkdir(parents=True, exist_ok=True)
DATA = json.loads(subprocess.check_output([
    "node", "--input-type=module", "-e",
    "import {lessons} from './uas/lessons.js';"
    "import {catalogue} from './uas/catalogue.js';"
    "import {quizQuestions} from './uas/quiz.js';"
    "console.log(JSON.stringify({lessons,catalogue,quizQuestions}));",
], cwd=ROOT, text=True))
LESSONS, CATALOGUE, QUESTIONS = DATA["lessons"], DATA["catalogue"], DATA["quizQuestions"]
checks: list[str] = []
errors: list[str] = []


def check(name: str, condition: bool) -> None:
    assert condition, name
    checks.append(name)
    print(f"PASS: {name}", flush=True)


def track(page):
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.on("response", lambda response: errors.append(f"HTTP {response.status}: {response.url}")
            if response.url.startswith(BASE) and response.status >= 400 else None)
    page.on("requestfailed", lambda request: errors.append(f"Request failed: {request.url}: {request.failure}")
            if request.url.startswith(BASE) else None)
    return page


def route(page, name: str) -> None:
    page.evaluate("name => { location.hash = name; }", name)
    view = name.split("/")[0]
    expect(page.locator(f'[data-view="{view}"]')).to_be_visible()
    if view == "lessons" and "/" in name:
        lesson_id = name.split("/", 1)[1]
        title = next(lesson["title"] for lesson in LESSONS if lesson["id"] == lesson_id)
        expect(page.locator("#current-lesson-title")).to_have_text(title)


def no_overflow(page, name: str) -> None:
    dimensions = page.evaluate("({width: innerWidth, scroll: document.documentElement.scrollWidth})")
    check(name, dimensions["scroll"] <= dimensions["width"])


def set_range(page, selector: str, value: int) -> None:
    page.locator(selector).evaluate("(node, value) => { node.value = value; node.dispatchEvent(new Event('input', {bubbles:true})); }", value)


def screenshot(page, filename: str, *, full_page: bool = True) -> None:
    # Chromium full-page captures can include an offscreen fixed skip link when
    # scrolled; start at document top to capture the actual default layout.
    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(path=str(ARTIFACTS / filename), full_page=full_page)


def stored(page):
    return page.evaluate("key => JSON.parse(localStorage.getItem(key))", KEY)


def answer_set(page, questions: list[dict], *, wrong_first: bool = False) -> None:
    for index, question in enumerate(questions):
        expect(page.locator("#answer-form legend")).to_have_text(question["prompt"])
        answer = (question["answer"] + 1) % len(question["options"]) if wrong_first and index == 0 else question["answer"]
        page.locator(f'#answer-form input[value="{answer}"]').check()
        page.get_by_role("button", name="Check answer", exact=True).click()
        expect(page.locator("#answer-feedback")).to_contain_text(question["explanation"])
        expect(page.locator("#answer-feedback")).to_contain_text(question["options"][question["answer"]])
        if wrong_first and index == 0:
            expect(page.locator("#answer-feedback")).to_contain_text("Review this idea.")
        else:
            expect(page.locator("#answer-feedback")).to_contain_text("Correct.")
        check(f"Question {question['id']} locks answers and explains reasoning", page.locator("#answer-form input:enabled").count() == 0)
        page.locator("#next-question").click()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path=os.environ.get("CHROMIUM_PATH", "/usr/bin/chromium"),
        headless=True, args=["--no-sandbox"],
    )
    context = browser.new_context(viewport={"width": 1440, "height": 1000}, accept_downloads=True)
    page = track(context.new_page())
    page.goto(f"{BASE}/uas/")
    expect(page.locator("#asset-count")).to_have_text(str(len(CATALOGUE)))
    check("All lesson cards are available", page.locator(".module-card").count() == len(LESSONS))
    check("Course totals match authored content", page.locator("#lesson-count").inner_text() == str(len(LESSONS)) and page.locator("#question-count").inner_text() == str(len(QUESTIONS)))
    check("Initial progress is empty", page.locator("#course-progress").get_attribute("value") == "0")
    screenshot(page, "desktop-overview.png")
    for view in VIEWS:
        route(page, view)
        check(f"Only the {view} view is displayed", page.locator(".view:visible").count() == 1)
        expect(page.locator(f'.nav-link[href="#{view}"]')).to_have_attribute("aria-current", "page")
        no_overflow(page, f"Desktop {view} has no outer overflow")

    # Every lesson is reachable, and the visible lesson heading follows navigation.
    for lesson in LESSONS:
        route(page, f"lessons/{lesson['id']}")
        check(f"Lesson {lesson['id']} includes all sections", page.locator("#lesson-content .lesson-section").count() == len(lesson["sections"]))
    route(page, f"lessons/{LESSONS[0]['id']}")
    page.locator("#complete-lesson").click()
    check("Completing a lesson persists its ID", stored(page)["completed"] == [LESSONS[0]["id"]])
    page.reload()
    expect(page.locator("#complete-lesson")).to_have_attribute("aria-pressed", "true")
    check("Reading progress survives reload", page.locator("#progress-label").inner_text().startswith("1 of"))
    page.evaluate("localStorage.setItem('unrelated-course-key','keep')")
    page.locator("#reset-progress").click()
    page.locator("#cancel-reset").click()
    check("Cancel reset keeps progress", stored(page)["completed"] == [LESSONS[0]["id"]])
    page.locator("#reset-progress").click()
    page.locator("#confirm-reset").click()
    check("Confirmed reset clears course progress only", stored(page)["completed"] == [] and page.evaluate("localStorage.getItem('unrelated-course-key')") == "keep")

    # Atlas discovery, filtering, modal semantics, and constrained comparisons.
    route(page, "atlas")
    check("Atlas shows every entry without filters", page.locator(".asset-card").count() == len(CATALOGUE))
    page.locator("#atlas-search").fill("this-label-does-not-exist")
    check("Empty atlas results explain how to recover", page.locator("#atlas-grid .empty-state").is_visible())
    page.locator("#atlas-search").fill("Shahed")
    check("Name search narrows atlas", 0 < page.locator(".asset-card").count() < len(CATALOGUE))
    page.locator("#atlas-search").fill("")
    page.locator("#atlas-evidence").select_option("uncertain")
    check("Evidence filter matches metadata", page.locator(".asset-card").count() == sum(asset["evidence"] == "uncertain" for asset in CATALOGUE))
    page.locator("#atlas-evidence").select_option("all")
    category = CATALOGUE[0]["category"]
    page.locator("#atlas-category").select_option(category)
    check("Category filter matches metadata", page.locator(".asset-card").count() == sum(asset["category"] == category for asset in CATALOGUE))
    page.locator("#atlas-category").select_option("all")
    entry_button = page.locator("[data-open]").first
    entry_button.focus()
    page.keyboard.press("Enter")
    expect(page.locator("#asset-dialog")).to_be_visible()
    expect(page.locator("#asset-dialog-title")).to_have_text(CATALOGUE[0]["name"])
    expect(page.locator("#asset-dialog-body")).to_contain_text(CATALOGUE[0]["evidenceNote"])
    page.keyboard.press("Escape")
    expect(page.locator("#asset-dialog")).not_to_be_visible()
    check("Modal closes with Escape and restores keyboard focus", entry_button.evaluate("node => node === document.activeElement"))
    entry_button.click()
    source_link = page.locator('#asset-dialog-body a[href^="#reference/"]').first
    source_id = source_link.get_attribute("href").split("/", 1)[1]
    source_link.click()
    expect(page.locator("#asset-dialog")).not_to_be_visible()
    expect(page.locator('[data-view="reference"]')).to_be_visible()
    expect(page.locator(f"#source-{source_id} h3")).to_be_focused()
    check("Atlas reading link closes modal and focuses its source", page.url.endswith(f"#reference/{source_id}"))
    source_lesson = next(lesson for lesson in LESSONS if lesson["sourceIds"])
    route(page, f"lessons/{source_lesson['id']}")
    lesson_source_link = page.locator('#lesson-content a[href^="#reference/"]').first
    lesson_source_id = lesson_source_link.get_attribute("href").split("/", 1)[1]
    lesson_source_link.click()
    expect(page.locator(f"#source-{lesson_source_id} h3")).to_be_focused()
    check("Lesson reading link focuses the related source", page.url.endswith(f"#reference/{lesson_source_id}"))
    route(page, "atlas")
    page.locator("[data-compare]").nth(0).check()
    page.locator("[data-compare]").nth(1).check()
    check("Comparison shows two selected entries and disables a third", page.locator("#compare-content article").count() == 2 and page.locator("[data-compare]").nth(2).is_disabled())
    page.locator("#clear-compare").click()
    check("Clearing comparison restores controls", not page.locator("#compare-panel").is_visible() and page.locator("[data-compare]:disabled").count() == 0)
    screenshot(page, "desktop-atlas.png")

    # CFAR actual controls: independent behavior rather than a screenshot-only test.
    route(page, "cfar")
    alpha_before = float(page.locator("#cfar-metrics .metric strong").first.inner_text())
    power_before = page.locator("#cell-calculation").inner_text().split(". Mean of", 1)[0]
    page.locator("#cfar-pfa").select_option("0.001")
    alpha_after = float(page.locator("#cfar-metrics .metric strong").first.inner_text())
    check("Lower requested false-alarm probability raises CFAR multiplier", alpha_after > alpha_before)
    check("Changing probability keeps the selected sample power fixed", page.locator("#cell-calculation").inner_text().split(". Mean of", 1)[0] == power_before)
    page.locator("#cfar-mode").select_option("nearby-targets")
    expect(page.locator("#cfar-summary")).to_contain_text("/2 injected peaks")
    set_range(page, "#cfar-training", 16)
    set_range(page, "#cfar-guard", 5)
    check("Guard and reference controls update valid inspectable cells", page.locator("#cfar-cell").get_attribute("min") == "21" and page.locator("#cfar-cell").get_attribute("max") == "74")
    set_range(page, "#cfar-cell", 21)
    expect(page.locator("#cell-calculation")).to_contain_text("Cell 21:")
    expect(page.locator("#cell-calculation")).to_contain_text("32 reference powers")
    set_range(page, "#cfar-strength", 0)
    expect(page.locator("#cfar-summary")).to_contain_text("0/0 injected peaks")
    scene_before = page.locator("#cfar-chart polyline").first.get_attribute("points")
    page.locator("#new-noise").click()
    check("New noise changes the simulated scene", page.locator("#cfar-chart polyline").first.get_attribute("points") != scene_before)
    page.locator("#cfar-mode").select_option("clutter-edge")
    expect(page.locator("#cfar-chart desc")).to_contain_text("threshold crossings")
    screenshot(page, "desktop-cfar.png")

    route(page, "network")
    expect(page.locator("#fusion-result")).to_contain_text("50.0%")
    page.locator("#fusion-independent").uncheck()
    expect(page.locator("#fusion-result")).to_contain_text("No combined probability calculated.")
    check("Dependent evidence does not produce a numeric posterior", "%" not in page.locator("#fusion-result").inner_text())
    page.locator("#fusion-independent").check()
    page.locator("#fusion-a").select_option("1")
    page.locator("#fusion-b").select_option("1")
    expect(page.locator("#fusion-result")).to_contain_text("10.0%")
    check("Neutral evidence preserves the prior", "10.0%" in page.locator("#fusion-result").inner_text())
    for sensor in ["radar", "eo", "rf", "acoustic"]:
        page.locator(f"#sensor-{sensor}").uncheck()
    expect(page.locator("#sensor-explanation")).to_contain_text("No observations is not the same as evidence of absence")
    page.locator("#sensor-rf").check()
    expect(page.locator("#sensor-explanation")).to_contain_text("aircraft need not emit")
    check("Sensor selection updates diagram description", "1 selected sensor" in page.locator("#network-chart desc").text_content())
    check("Network diagram white text remains readable", page.locator('#network-chart text[fill="white"]').first.evaluate("node => getComputedStyle(node).fill") == "rgb(255, 255, 255)")
    screenshot(page, "desktop-network.png")
    page.locator(".skip-link").focus()
    page.keyboard.press("Enter")
    check("Skip link preserves the current view and moves focus to main", page.url.endswith("#network") and page.locator("#main").evaluate("node => node === document.activeElement"))

    # Practice, explained failure, full assessment, persistence, and safe form output.
    route(page, "practice")
    page.locator("#quiz-module").select_option(LESSONS[0]["id"])
    page.locator("#start-quiz").click()
    module_questions = [q for q in QUESTIONS if q["moduleId"] == LESSONS[0]["id"]]
    answer_set(page, module_questions, wrong_first=True)
    expect(page.locator("#results-heading")).to_contain_text(f"{len(module_questions)-1} / {len(module_questions)}")
    check("Missed practice answer links to remediation", page.locator("#quiz-stage details").count() == 1 and page.locator("#quiz-stage details a").get_attribute("href") == f"#lessons/{LESSONS[0]['id']}")
    check("Lesson practice is separate from full assessment", stored(page)["assessment"] is None)
    page.evaluate("""({key,total}) => {
      const data=JSON.parse(localStorage.getItem(key));
      data.assessment={correct:total-1,total}; delete data.assessmentRevision;
      localStorage.setItem(key, JSON.stringify(data));
    }""", {"key": KEY, "total": len(QUESTIONS)})
    page.reload()
    expect(page.locator("#assessment-label")).to_contain_text("Earlier edition assessment")
    expect(page.locator("#assessment-label")).to_contain_text("Retake to review the updated photo lessons")
    check("Legacy score survives with an explicit earlier-edition label", f"{len(QUESTIONS)-1}/{len(QUESTIONS)}" in page.locator("#assessment-label").inner_text())
    page.locator("#quiz-module").select_option("all")
    page.locator("#start-quiz").click()
    answer_set(page, QUESTIONS)
    expect(page.locator("#results-heading")).to_have_text(f"{len(QUESTIONS)} / {len(QUESTIONS)} · 100%")
    check("Full assessment persists exact score", stored(page)["assessment"] == {"correct": len(QUESTIONS), "total": len(QUESTIONS)})
    check("Retaking the full assessment upgrades its revision", stored(page)["assessmentRevision"] == 2)
    page.reload()
    expect(page.locator("#assessment-label")).to_contain_text(f"{len(QUESTIONS)}/{len(QUESTIONS)} (100%)")
    route(page, "reference")
    before_storage = page.evaluate("JSON.stringify({...localStorage})")
    page.locator("#report-observation").fill("Fictional video: fixed wing; tail not visible.")
    page.locator("#report-uncertainty").fill("The claimed model name is secondhand.")
    page.get_by_role("button", name="Show a model answer", exact=True).click()
    expect(page.locator("#report-feedback")).to_be_visible()
    with page.expect_download() as download_info:
        page.locator("#download-report").click()
    download = download_info.value
    note_path = ARTIFACTS / download.suggested_filename
    download.save_as(note_path)
    check("Practice download includes fictional label and typed notes", "FICTIONAL TRAINING NOTE" in note_path.read_text() and "tail not visible" in note_path.read_text())
    check("Practice notes are not persisted in browser storage", before_storage == page.evaluate("JSON.stringify({...localStorage})"))
    check("New-tab references protect opener and referrer", page.locator('#source-list a[target="_blank"]').evaluate_all("nodes => nodes.every(node => node.rel.includes('noopener') && node.rel.includes('noreferrer'))"))

    # Fault handling: corrupt data, unavailable storage, invalid identifiers.
    page.evaluate("key => localStorage.setItem(key, '{malformed')", KEY)
    page.reload()
    expect(page.locator("#storage-status")).to_contain_text("could not be read")
    page.evaluate("location.hash = 'lessons/not-a-real-lesson'")
    expect(page.locator("#current-lesson-title")).to_have_text(LESSONS[0]["title"])
    check("Unknown lesson IDs fall back to a real lesson", page.locator("#lesson-content .lesson-section").count() > 0)
    page.evaluate("key => localStorage.setItem(key, JSON.stringify({completed:['fake','foundations','foundations'],assessment:{correct:999,total:40}}))", KEY)
    page.reload()
    check("Stored progress rejects invalid and duplicate lesson IDs", page.locator("#course-progress").get_attribute("value") == "1" and "not yet attempted" in page.locator("#assessment-label").inner_text())
    blocked_context = browser.new_context()
    blocked_context.add_init_script("Object.defineProperty(window, 'localStorage', {get() {throw new DOMException('Unavailable', 'SecurityError');}});")
    blocked = track(blocked_context.new_page())
    blocked.goto(f"{BASE}/uas/#lessons/{LESSONS[0]['id']}")
    expect(blocked.locator("#storage-status")).to_contain_text("could not be read")
    blocked.locator("#complete-lesson").click()
    expect(blocked.locator("#storage-status")).to_contain_text("only until this page closes")
    check("Course remains usable without browser storage", blocked.locator("#course-progress").get_attribute("value") == "1")
    blocked_context.close()

    # Readable mobile routes and modal/quiz geometry at narrow supported widths.
    for width in [390, 320]:
        mobile_context = browser.new_context(viewport={"width": width, "height": 844}, is_mobile=True, has_touch=True)
        mobile = track(mobile_context.new_page())
        mobile.goto(f"{BASE}/uas/")
        expect(mobile.locator("#asset-count")).to_have_text(str(len(CATALOGUE)))
        for view in VIEWS:
            route(mobile, view)
            no_overflow(mobile, f"{width}px {view} has no outer overflow")
            if view in ["overview", "cfar", "network"]:
                screenshot(mobile, f"mobile-{width}-{view}.png")
        route(mobile, "atlas")
        mobile.locator("[data-open]").first.click()
        no_overflow(mobile, f"{width}px atlas modal has no outer overflow")
        check(f"{width}px modal fits viewport", mobile.locator("#asset-dialog").bounding_box()["width"] <= width)
        mobile.locator("#close-asset").click()
        route(mobile, "practice")
        mobile.locator("#start-quiz").click()
        no_overflow(mobile, f"{width}px quiz has no outer overflow")
        screenshot(mobile, f"mobile-{width}-quiz.png")
        mobile_context.close()

    # Workbook must be fully usable with scripting disabled, including answers.
    static_context = browser.new_context(java_script_enabled=False, viewport={"width": 390, "height": 844})
    static_page = track(static_context.new_page())
    static_page.goto(f"{BASE}/uas/")
    expect(static_page.locator("noscript a")).to_be_visible()
    static_page.locator("noscript a").click()
    body = static_page.locator("body").inner_text()
    check("Workbook has exact lesson/atlas/question/answer counts", static_page.locator(".workbook-lesson").count() == len(LESSONS) and static_page.locator(".workbook-asset").count() == len(CATALOGUE) and static_page.locator(".workbook-question").count() == len(QUESTIONS) and static_page.locator(".workbook-answer").count() == len(QUESTIONS))
    no_overflow(static_page, "390px static workbook has no outer overflow")
    check("Static workbook contains every lesson title", all(lesson["title"] in body for lesson in LESSONS))
    check("Static workbook contains every catalogue name", all(asset["name"] in body for asset in CATALOGUE))
    check("Static workbook contains every question and explanation", all(q["prompt"] in body and q["explanation"] in body for q in QUESTIONS))
    check("Static workbook retains source limitations", "not" in body.lower() and "source" in body.lower() and "retriev" in body.lower())
    screenshot(static_page, "mobile-workbook.png", full_page=False)
    static_context.close()
    check("No browser script errors or local resource failures", not errors)
    browser.close()

(ARTIFACTS / "results.json").write_text(json.dumps({"checks": len(checks), "passed": checks, "errors": errors}, indent=2) + "\n")
print(f"\n{len(checks)} browser checks passed. Artifacts: {ARTIFACTS}")
