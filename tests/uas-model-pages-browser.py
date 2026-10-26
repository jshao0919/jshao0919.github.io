#!/usr/bin/env python3
"""Resilience and atlas-image regression for independently readable model pages.

All external image/API responses are mocked by the same neutral fixtures used
in uas-photos-browser.py. No live image, identity, or license verification.
Requires Python Playwright plus Chromium outside this checkout; serve the repo
at BASE_URL (default http://127.0.0.1:8770) before running this file.
"""
from __future__ import annotations

import importlib.util
import json
import os
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import expect, sync_playwright


sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("uas_photo_fixture", Path(__file__).with_name("uas-photos-browser.py"))
fixture_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fixture_module)
CATALOGUE = fixture_module.CATALOGUE
BASE = fixture_module.BASE
MockTransport = fixture_module.MockTransport
fixture = fixture_module.fixture
payload = fixture_module.payload
OUT = Path(os.environ.get("MODEL_SCREENSHOT_DIR", "/tmp/uas-model-pages-qa"))
OUT.mkdir(parents=True, exist_ok=True)
checks = []
errors = []


def check(name, condition):
    assert condition, name
    checks.append(name)
    print(f"PASS: {name}", flush=True)


def page_in(context):
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(str(error)))
    return page


def model_url(asset_id):
    return f"{BASE}/uas/models/{asset_id}.html"


def load_static(page):
    expect(page.locator("#load-source-photos")).to_be_enabled()
    page.locator("#load-source-photos").click()
    expect(page.locator("#photo-results")).to_have_attribute("aria-busy", "false")


with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH", "/usr/bin/chromium"), args=["--no-sandbox"], headless=True)

    # The directory and every full record work with all JavaScript disabled.
    nojs = browser.new_context(java_script_enabled=False, viewport={"width": 390, "height": 844})
    nojs_transport = MockTransport()
    nojs_transport.install(nojs)
    page = page_in(nojs)
    page.goto(f"{BASE}/uas/models/")
    check("Model directory exposes32ordinary HTML destinations without JavaScript", page.locator(".model-directory .module-card").count() == len(CATALOGUE))
    check("Directory needs no script and fits390px", page.locator("script").count() == 0 and page.evaluate("document.documentElement.scrollWidth <= innerWidth"))
    for asset in CATALOGUE:
        page.goto(f"{BASE}/uas/models/")
        page.locator(f'.model-directory a[href="{asset["id"]}.html"]').click()
        expect(page.locator("body")).to_have_attribute("data-model-id", asset["id"])
        expect(page.locator("h1")).to_have_text(asset["name"])
        body = page.locator("body").inner_text()
        check(f"No-JS record {asset['id']} contains full authored summary and evidence limits", asset["summary"] in body and asset["evidenceNote"] in body and all(cue in body for cue in asset["cues"]) and all(limit in body for limit in asset["confusions"]))
        check(f"No-JS record {asset['id']} retains source links and clear optional gallery state", page.locator(".static-source-links a").count() >= 1 and page.locator("#load-source-photos").is_disabled() and page.locator("noscript").is_visible())
        check(f"No-JS record {asset['id']} fits390px", page.evaluate("document.documentElement.scrollWidth <= innerWidth"))
    check("Static directory and32records do not request images automatically", not nojs_transport.requests and not nojs_transport.images)
    page.goto(f"{BASE}/uas/")
    page.locator('.course-fallback a[href="models/"]').click()
    expect(page.locator(".model-directory")).to_be_visible()
    check("Course fallback opens complete model directory with scripts disabled", page.locator(".model-directory .module-card").count() == len(CATALOGUE))
    nojs.close()

    # A missing model enhancement can never remove its authored HTML record.
    missing_model = browser.new_context(viewport={"width": 390, "height": 844})
    missing_model_transport = MockTransport()
    missing_model_transport.install(missing_model)
    missing_model.route("**/assets/model.*.js", lambda route: route.fulfill(status=404, body="Controlled missing model enhancement"))
    page = page_in(missing_model)
    page.goto(model_url("shahed-136"))
    expect(page.locator("h1")).to_have_text("Shahed-136")
    check("Missing model bundle leaves record and ordinary source links usable", page.locator(".static-source-links a").count() == 1 and page.locator("#load-source-photos").is_disabled() and "direct source links" in page.locator("#photo-status").inner_text())
    page.locator('.source-study-nav a[href="index.html"]').first.click()
    check("Missing model bundle still permits directory navigation", page.locator(".model-directory .module-card").count() == len(CATALOGUE))
    missing_model.close()

    # A failed course boot explicitly offers the independent directory/workbook.
    missing_course = browser.new_context()
    missing_course_transport = MockTransport()
    missing_course_transport.install(missing_course)
    missing_course.route("**/assets/course.*.js", lambda route: route.fulfill(status=404, body="Controlled missing course bundle"))
    page = page_in(missing_course)
    page.clock.install()
    page.goto(f"{BASE}/uas/#study/shahed-136")
    expect(page.locator(".course-fallback")).to_be_visible()
    page.clock.fast_forward(9000)
    expect(page.locator("#app-startup-status")).to_contain_text("could not finish loading")
    page.locator('.course-fallback a[href="models/"]').click()
    check("Missing course bundle gives visible failure and a working independent directory", page.locator(".model-directory .module-card").count() == len(CATALOGUE))
    missing_course.close()

    # Legacy hasOwn absence and obsolete source files cannot break bundled boot.
    modern = browser.new_context(viewport={"width": 390, "height": 844})
    transport = MockTransport()
    transport.install(modern)
    modern.add_init_script("Object.hasOwn = undefined;")
    obsolete_requests = []
    modern.route("**/app.js", lambda route: (obsolete_requests.append(route.request.url), route.fulfill(status=200, content_type="text/javascript", body="throw Error('obsolete unbundled application');")))
    page = page_in(modern)
    scripts = []
    page.on("request", lambda request: scripts.append(request.url) if request.resource_type == "script" else None)
    page.goto(f"{BASE}/uas/#study/shahed-136")
    expect(page.locator("#study-model-title")).to_have_text("Shahed-136")
    expect(page.locator("html")).to_have_attribute("data-course-ready", "true")
    check("Legacy Object.hasOwn absence no longer breaks model lookup", page.locator("#study-model option").count() == len(CATALOGUE))
    box = page.locator("#study-model-title").bounding_box()
    check("Old direct hash link scrolls the model title into the first viewport", 0 <= box["y"] < 844)
    check("Course boot fetches one versioned bundle and no stale bare app/module files", len(scripts) == 1 and "/assets/course." in scripts[0] and not obsolete_requests)
    page.goto(model_url("ababil-4-5"))
    expect(page.locator("html")).to_have_attribute("data-photo-enhancement", "ready")
    expect(page.locator("h1")).to_have_text("Ababil-4 / Ababil-5: reported labels")
    check("Independent model uses one versioned enhancement with no bare module imports", len(scripts) == 2 and "/assets/model." in scripts[1] and not obsolete_requests)
    check("Independent model page loads zero external images before consent", not transport.requests and not transport.images)
    page.locator("#photo-query").select_option("Ababil-5")
    load_static(page)
    expect(page.locator(".photo-card")).to_have_count(1)
    check("Static model gallery uses selected exact variant with attribution", parse_qs(urlparse(transport.requests[-1]["url"]).query)["gsrsearch"] == ['"Ababil-5"'] and "Mock Test Creator" in page.locator(".photo-card").inner_text() and "CC BY-SA 4.0" in page.locator(".photo-card").inner_text())
    transport.mode = "network-error"
    load_static(page)
    expect(page.locator("#photo-status")).to_contain_text("Images could not be loaded")
    check("Static gallery failure never removes its model record or direct searches", page.locator("h1").is_visible() and page.locator(".static-source-links a").count() == 2)
    transport.mode = "hold"
    page.locator("#load-source-photos").click()
    expect(page.locator("#photo-results")).to_have_attribute("aria-busy", "true")
    page.evaluate("""() => {
      window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted:true}));
      window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted:true}));
    }""")
    expect(page.locator("#load-source-photos")).to_be_enabled()
    expect(page.locator("#photo-results")).to_have_attribute("aria-busy", "false")
    expect(page.locator("#photo-status")).to_contain_text("Image search stopped")
    transport.release(payload(fixture(21)))
    page.wait_for_timeout(80)
    check("Static gallery pagehide/pageshow restores usable controls and rejects late results", page.locator(".photo-card").count() == 0)
    transport.mode, transport.data = "success", payload(fixture(22))
    load_static(page)
    expect(page.locator(".photo-card")).to_have_count(1)
    check("Static gallery can retry after a simulated bfcache lifecycle", "source 22" in page.locator(".photo-card").inner_text())

    # Atlas images: explicit query, source attribution, filtering cache, and errors.
    page.goto(f"{BASE}/uas/#atlas")
    expect(page.locator("#atlas-grid .asset-card")).to_have_count(len(CATALOGUE))
    direct_links = page.locator('#atlas-grid a[href^="models/"]').evaluate_all("nodes => nodes.map(node => node.getAttribute('href'))")
    check("All32 atlas study buttons use corresponding standalone URLs", set(direct_links) == {f"models/{asset['id']}.html" for asset in CATALOGUE})
    for asset in CATALOGUE:
        page.locator(f'[data-open="{asset["id"]}"]').click()
        check(f"Detail dialog {asset['id']} retains independent study URL", page.locator('#asset-dialog-body a[href^="models/"]').get_attribute("href") == f"models/{asset['id']}.html")
        page.locator("#close-asset").click()
    before = len(transport.requests)
    panel = page.locator('[data-atlas-photo="shahed-136"]')
    panel.locator("[data-load-atlas-photo]").click()
    expect(panel.locator(".atlas-source-photo")).to_have_count(1)
    expect(panel.locator(".atlas-photo-status")).to_contain_text("not a verified result")
    panel.locator("img").scroll_into_view_if_needed()
    page.wait_for_function("document.querySelector('[data-atlas-photo=shahed-136] img')?.naturalWidth === 640")
    check("Atlas explicitly loads one correctly scoped candidate request", len(transport.requests) == before + 1 and parse_qs(urlparse(transport.requests[-1]["url"]).query)["gsrsearch"] == ['"Shahed-136"'])
    check("Atlas source image retains description, creator, reuse, original-file link", all(text in panel.inner_text() for text in ["MOCK TEST ONLY", "Mock Test Creator", "CC BY-SA 4.0", "Original file and full metadata"]))
    check("Atlas thumbnail preserves composition with object-fit contain", panel.locator("img").evaluate("node => getComputedStyle(node).objectFit === 'contain'"))
    page.locator("#atlas-search").fill("Ababil")
    page.locator("#atlas-search").fill("Shahed-136")
    expect(page.locator('[data-atlas-photo="shahed-136"] .atlas-source-photo')).to_have_count(1)
    check("Atlas filter changes preserve the loaded entry without refetching API", len(transport.requests) == before + 1)
    expect(page.locator('[data-atlas-photo="shahed-136"] .atlas-photo-status')).to_contain_text("retained for this browser session")
    page.locator("#atlas-search").fill("Shahed-131")
    check("Cached photo never migrates to another model card", page.locator('.atlas-source-photo').count() == 0)
    error_panel = page.locator('[data-atlas-photo="shahed-131"]')
    transport.mode = "http-error"
    error_panel.locator("[data-load-atlas-photo]").click()
    expect(error_panel.locator(".atlas-photo-status")).to_contain_text("HTTP 503")
    check("Atlas error preserves retry, source link, and model link", error_panel.locator("[data-load-atlas-photo]").is_enabled() and error_panel.locator('a[target="_blank"]').is_visible() and page.locator('#atlas-grid a[href="models/shahed-131.html"]').is_visible())
    transport.mode, transport.data = "success", payload()
    error_panel.locator("[data-load-atlas-photo]").click()
    expect(error_panel.locator(".atlas-photo-status")).to_contain_text("No source image meeting")
    check("Atlas empty result never substitutes another model image", error_panel.locator("img").count() == 0)
    transport.data = payload(fixture(77))
    error_panel.locator("[data-load-atlas-photo]").click()
    expect(error_panel.locator(".atlas-source-photo")).to_have_count(1)
    check("Atlas retry succeeds without reloading the course", "source 77" in error_panel.inner_text())
    transport.mode = "hold"
    error_panel.locator("[data-load-atlas-photo]").click()
    expect(error_panel.locator("[data-load-atlas-photo]")).to_be_disabled()
    page.locator("#atlas-search").fill("Ababil-3")
    transport.release(payload(fixture(88)))
    page.wait_for_timeout(80)
    check("Pending atlas request cannot attach its result after filter replacement", page.locator(".atlas-source-photo").count() == 0 and "source 88" not in page.locator("#atlas-grid").inner_text())
    page.locator('[data-load-atlas-photo="ababil-3"]').click()
    expect(page.locator('[data-load-atlas-photo="ababil-3"]')).to_be_disabled()
    page.evaluate("""() => {
      window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted:true}));
      window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted:true}));
    }""")
    expect(page.locator('[data-load-atlas-photo="ababil-3"]')).to_be_enabled()
    transport.release(payload(fixture(89)))
    page.wait_for_timeout(80)
    check("Atlas pagehide cancels pending work without leaving a disabled retry", "source 89" not in page.locator("#atlas-grid").inner_text())
    modern.close()

    for width in [390, 320]:
        mobile_context = browser.new_context(viewport={"width": width, "height": 844}, is_mobile=True, has_touch=True)
        mobile_transport = MockTransport()
        mobile_transport.install(mobile_context)
        mobile = page_in(mobile_context)
        mobile.goto(model_url("shahed-136"))
        expect(mobile.locator("html")).to_have_attribute("data-photo-enhancement", "ready")
        check(f"{width}px independent model heading is visible without deep scrolling", 0 <= mobile.locator("h1").bounding_box()["y"] < 844)
        load_static(mobile)
        expect(mobile.locator(".photo-card")).to_have_count(1)
        check(f"{width}px static model with source card has no outer overflow", mobile.evaluate("document.documentElement.scrollWidth <= innerWidth"))
        check(f"{width}px static photo is uncropped", mobile.locator(".photo-card img").evaluate("node => getComputedStyle(node).objectFit === 'contain'"))
        mobile.goto(f"{BASE}/uas/#atlas")
        mobile.locator("#atlas-search").fill("Shahed-136")
        mobile.locator('[data-load-atlas-photo="shahed-136"]').click()
        expect(mobile.locator(".atlas-source-photo")).to_have_count(1)
        check(f"{width}px atlas photo and attribution have no outer overflow", mobile.evaluate("document.documentElement.scrollWidth <= innerWidth"))
        mobile.locator(".atlas-source-photo").evaluate("node => node.insertAdjacentHTML('afterbegin','<p style=\"background:#fff1c9;padding:12px\">MOCK BROWSER TEST: synthetic rectangle; not a real aircraft photograph</p>')")
        mobile.locator(".asset-card:has(.atlas-source-photo)").screenshot(path=str(OUT / f"mock-atlas-{width}.png"), style=".skip-link{visibility:hidden!important}")
        mobile_context.close()

    check("No external request escaped mock interception", not fixture_module.UNEXPECTED_EXTERNAL)
    check("No runtime errors in healthy or intentionally degraded scenarios", not errors)
    browser.close()

(OUT / "results.json").write_text(json.dumps({"checks": len(checks), "passed": checks, "errors": errors, "externalVerification": "Mocked only; no live Commons photograph, license, identity, or service verified."}, indent=2) + "\n")
print(f"\n{len(checks)} static-model/atlas regression checks passed. Artifacts: {OUT}")
