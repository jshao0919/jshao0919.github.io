#!/usr/bin/env python3
"""Browser regression for Motor Pool, the 91B PMCS learning course.

Serve the repository at http://127.0.0.1:8770, build with `node 91b/build.mjs`,
then run this file. Requires Python Playwright and Chromium. No live external
references are requested or treated as verified by this test.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess

from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = os.environ.get('BASE_URL', 'http://127.0.0.1:8770').rstrip('/')
ARTIFACTS = Path(os.environ.get('SCREENSHOT_DIR', '/tmp/91b-qa'))
ARTIFACTS.mkdir(parents=True, exist_ok=True)
KEY = 'mathjock.91b.progress.v1'
VIEWS = ['overview', 'learn', 'walkaround', 'leaks', 'forms', 'handoff', 'quiz', 'reference']
DATA = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {lessons,quizQuestions,glossary} from './91b/curriculum.js';"
    "import {inspectionStations,leakClasses,workflowSteps} from './91b/inspections.js';"
    "import {formScenarios} from './91b/forms.js';"
    "console.log(JSON.stringify({lessons,quizQuestions,glossary,inspectionStations,leakClasses,workflowSteps,formScenarios}));",
], cwd=ROOT, text=True))
LESSONS, QUESTIONS = DATA['lessons'], DATA['quizQuestions']
STATIONS, SCENARIOS = DATA['inspectionStations'], DATA['formScenarios']
checks: list[str] = []
errors: list[str] = []
external_requests: list[str] = []


def check(name: str, condition: bool = True):
    assert condition, name
    checks.append(name)
    print(f'PASS: {name}', flush=True)


def track(page):
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    page.on('response', lambda r: errors.append(f'HTTP {r.status}: {r.url}') if r.url.startswith(BASE) and r.status >= 400 else None)
    page.on('request', lambda r: external_requests.append(r.url) if r.url.startswith(('http://', 'https://')) and not r.url.startswith(BASE) else None)
    return page


def route(page, name):
    page.evaluate('name => { location.hash = name; }', name)
    expect(page.locator(f'[data-view="{name.split("/")[0]}"]')).to_be_visible()
    if name.startswith('learn/'):
        lesson = next(l for l in LESSONS if l['id'] == name.split('/')[1])
        expect(page.locator('#lesson-title')).to_have_text(lesson['title'])


def overflow(page, name):
    size = page.evaluate('({width: innerWidth, scroll: document.documentElement.scrollWidth})')
    check(name, size['scroll'] <= size['width'])


def screenshot(page, name):
    page.evaluate('scrollTo(0,0)')
    page.screenshot(path=str(ARTIFACTS / name), full_page=True)


def saved(page):
    return page.evaluate('key => JSON.parse(localStorage.getItem(key))', KEY)


def fill_demo(page):
    for _ in range(5):
        page.locator('#form-demo').click()
    expect(page.locator('#form-demo')).to_be_disabled()


def check_quiz_set(page, questions, wrong_first=False):
    for i, q in enumerate(questions):
        expect(page.locator('#quiz-question')).to_have_text(q['prompt'])
        answer = (q['answer'] + 1) % len(q['options']) if wrong_first and i == 0 else q['answer']
        page.locator(f'input[name="quiz-answer"][value="{answer}"]').check()
        page.locator('#quiz-form button[type="submit"]').click()
        expect(page.locator('#quiz-feedback')).to_contain_text(q['explanation'])
        expect(page.locator('#quiz-feedback')).to_contain_text(q['options'][q['answer']])
        expect(page.locator('#quiz-feedback')).to_contain_text('Review this idea.' if wrong_first and i == 0 else 'Correct.')
        check(f"Knowledge check {q['id']} explains and locks submitted answers", page.locator('input[name="quiz-answer"]:enabled').count() == 0)
        page.locator('#quiz-next').click()


def main():
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), args=['--no-sandbox'])
        context = browser.new_context(viewport={'width': 1440, 'height': 1000}, accept_downloads=True)
        page = track(context.new_page())
        page.clock.install()
        page.goto(f'{BASE}/91b/')
        expect(page.locator('#startup-message')).to_be_hidden()
        check('Course starts with one visible view', page.locator('[data-view]:visible').count() == 1)
        check('Animations are paused on initial load', page.locator('.is-playing').count() == 0)
        check('Course has expected teaching coverage', len(LESSONS) == 14 and len(STATIONS) == 12 and len(SCENARIOS) >= 6 and len(QUESTIONS) == 42)
        script_srcs = page.locator('script[src]').evaluate_all('(nodes)=>nodes.map(n=>n.getAttribute("src"))')
        check('Course loads a content-named local bundle', len(script_srcs) == 1 and script_srcs[0].startswith('assets/') and script_srcs[0].endswith('.js'))
        for view in VIEWS:
            route(page, view)
            expect(page.locator(f'[data-route="{view}"]')).to_have_attribute('aria-current', 'page')
            check(f'Navigation opens {view}', page.locator('[data-view]:visible').count() == 1)
        for lesson in LESSONS:
            route(page, f"learn/{lesson['id']}")
            check(f"Lesson {lesson['id']} contains every teaching section", page.locator('.lesson-content .teaching-section').count() == len(lesson['sections']))
            expect(page.locator('.lesson-content a[href="lessons/'+lesson['id']+'.html"]')).to_be_visible()
            page.locator('#lesson-complete').click()
            expect(page.locator('#lesson-complete')).to_have_text('Reviewed ✓')
        check('All lesson completions are stored exactly once', len(saved(page)['lessons']) == len(LESSONS))
        page.locator('#lesson-complete').click()
        check('Repeated review does not duplicate progress', len(saved(page)['lessons']) == len(LESSONS))
        page.reload()
        expect(page.locator('#lesson-complete')).to_have_text('Reviewed ✓')
        check('Lesson progress survives reload', len(saved(page)['lessons']) == len(LESSONS))

        route(page, 'walkaround')
        page.locator('#station-check').click()
        expect(page.locator('#station-feedback')).to_contain_text('Choose an answer')
        check('Station completion needs an answer and checklist', len(saved(page)['stations']) == 0)
        for i, station in enumerate(STATIONS):
            page.locator(f'[data-station="{i}"]').click()
            expect(page.locator('[data-view="walkaround"] .station-panel h2')).to_have_text(station['title'])
            expect(page.locator(f'#truck-scene [data-zone-marker="{station["zone"]}"].active-marker')).to_be_visible()
            first_step = page.locator('#inspection-step').inner_text()
            page.locator('#station-next-step').click()
            expect(page.locator('#inspection-step')).to_have_text(station['steps'][1])
            page.locator('#station-prev-step').click()
            expect(page.locator('#inspection-step')).to_have_text(first_step)
            page.locator('#station-play').click()
            expect(page.locator('#station-play')).to_have_attribute('aria-pressed', 'true')
            expect(page.locator('#truck-scene')).to_have_class('is-playing')
            if i == 0:
                page.clock.run_for(7100)
                expect(page.locator('#inspection-step')).to_have_text(station['steps'][1])
                check('Inspection playback advances the teaching step after its reading interval')
            page.locator('#station-play').click()
            expect(page.locator('#station-play')).to_have_attribute('aria-pressed', 'false')
            page.locator(f'input[name="station-answer"][value="{station["question"]["answer"]}"]').check()
            page.locator('#station-check').click()
            expect(page.locator('#station-feedback')).to_contain_text('Rehearse and check each inspection step')
            for box in page.locator('input[name="station-step"]').all():
                box.check()
            if i == 0:
                page.locator(f'input[name="station-answer"][value="{(station["question"]["answer"]+1)%4}"]').check()
                page.locator('#station-check').click()
                expect(page.locator('#station-feedback')).to_contain_text('Review this observation.')
                check('An incorrect station answer does not earn completion', len(saved(page)['stations']) == 0)
                page.locator(f'input[name="station-answer"][value="{station["question"]["answer"]}"]').check()
            page.locator('#station-check').click()
            expect(page.locator('#station-feedback')).to_contain_text('Station practiced.')
            expect(page.locator('#station-feedback')).to_contain_text(station['question']['explanation'])
            check(f"Station {station['id']} highlights, steps, pauses, and checks understanding", station['id'] in saved(page)['stations'])
        check('All twelve stations save completion', len(saved(page)['stations']) == len(STATIONS))
        for phase in ['before', 'during', 'after']:
            page.locator(f'[data-phase="{phase}"]').click()
            expected = next(s for s in STATIONS if s['phase'] == phase)
            expect(page.locator('[data-view="walkaround"] .station-panel h2')).to_have_text(expected['title'])
            check(f'{phase} phase selects an appropriate station')
        while page.locator('#station-next-step').is_enabled():
            page.locator('#station-next-step').click()
        page.locator('#station-play').click()
        expect(page.locator('#inspection-step')).to_have_text(next(s for s in STATIONS if s['phase'] == 'after')['steps'][0])
        check('Playing a completed inspection restarts from its first step')
        route(page, 'overview')
        check('Leaving a demo stops its animation', page.locator('.is-playing').count() == 0)

        route(page, 'leaks')
        for leak in DATA['leakClasses']:
            page.locator(f'[data-leak="{leak["id"]}"]').click()
            expect(page.locator('[data-view="leaks"] .station-panel h2')).to_have_text(leak['label'])
            expect(page.locator('#leak-play')).to_have_attribute('aria-pressed', 'false')
            page.locator('#leak-play').click()
            expect(page.locator('#leak-play')).to_have_attribute('aria-pressed', 'true')
            page.locator('#leak-play').click()
            expect(page.locator('#leak-play')).to_have_attribute('aria-pressed', 'false')
            example = page.locator('#leak-observation').inner_text().lower()
            required = {'I': ['no drops formed'], 'II': ['drops formed', 'no drops fell'], 'III': ['drops fell']}[leak['id']]
            check(f"Leak class {leak['id']} has a controllable illustration and matching observation example", all(term in example for term in required))
        page.locator('#leak-check').click()
        expect(page.locator('#leak-feedback')).to_contain_text('Choose an observation')
        page.locator('input[name="leak-answer"][value="0"]').check()
        page.locator('#leak-check').click()
        expect(page.locator('#leak-feedback')).to_contain_text('Review the distinction.')
        page.locator('input[name="leak-answer"][value="1"]').check()
        page.locator('#leak-check').click()
        expect(page.locator('#leak-feedback')).to_contain_text('Correct.')
        check('Leak quiz distinguishes observation from operating permission', 'does not determine equipment status' in page.locator('#leak-feedback').inner_text())

        route(page, 'forms')
        for scenario in SCENARIOS:
            page.locator('#scenario-select').select_option(scenario['id'])
            expect(page.locator('#scenario-title')).to_have_text(scenario['title'])
            page.locator('#form-reset').click()
            page.locator('#practice-form button[type="submit"]').click()
            expect(page.locator('#form-feedback')).to_contain_text('Review these entries.')
            fill_demo(page)
            for key, value in scenario['expected'].items():
                expect(page.locator(f'#practice-form [name="{key}"]')).to_have_value(value)
            page.locator('#practice-form button[type="submit"]').click()
            expect(page.locator('#form-feedback')).to_contain_text('Practice entry meets this scenario’s rubric.')
            page.locator('[name="initials"]').fill('FAKE')
            page.locator('#practice-form button[type="submit"]').click()
            expect(page.locator('#form-feedback')).to_contain_text('Review these entries.')
            page.locator('[name="initials"]').fill(scenario['expected']['initials'])
            with page.expect_download() as pending:
                page.locator('#form-export').click()
            record = json.loads(Path(pending.value.path()).read_text())
            check(f"Form scenario {scenario['id']} coaches, rejects false correction initials, and exports a training record", record['feedback']['passed'] and 'NOT AN OFFICIAL' in record['documentType'])
        route(page, 'overview')
        route(page, 'forms')
        if page.locator('#form-demo').is_enabled():
            page.locator('#form-demo').click()
            expect(page.locator('#demo-feedback')).not_to_be_empty()
        check('Returning to a worked form leaves the demo control in a usable state')
        page.locator('#scenario-select').select_option(SCENARIOS[0]['id'])
        test_text = '<img src=x onerror="window.unsafeFormExecuted=true">'
        page.locator('[name="fault"]').fill(test_text)
        route(page, 'overview')
        route(page, 'forms')
        expect(page.locator('[name="fault"]')).to_have_value(test_text)
        check('Form draft survives navigation as text without markup execution', not page.evaluate('Boolean(window.unsafeFormExecuted)') and page.locator('#practice-form img').count() == 0)
        page.locator('#form-reset').click()
        expect(page.locator('[name="fault"]')).to_have_value('')
        check('Start blank resets an exercise draft')
        check('Four related form guides are accessible', page.locator('.guide-card').count() == 4)
        for detail in page.locator('.guide-card details').all():
            detail.locator('summary').click()
            expect(detail.locator('dl')).to_be_visible()

        route(page, 'handoff')
        page.locator('#handoff-check').click()
        expect(page.locator('#handoff-feedback')).to_contain_text('Review the handoff.')
        page.locator('#handoff-play').click()
        expect(page.locator('#handoff-play')).to_have_attribute('aria-pressed', 'true')
        page.locator('#handoff-play').click()
        expect(page.locator('#handoff-play')).to_have_attribute('aria-pressed', 'false')
        for i, step in enumerate(DATA['workflowSteps']):
            page.locator(f'[data-handoff="{i}"]').click()
            expect(page.locator('#handoff-title')).to_have_text(step['title'])
            expect(page.locator('#handoff-body')).to_have_text(step['body'])
        page.locator('#handoff-play').click()
        expect(page.locator('#handoff-title')).to_have_text(DATA['workflowSteps'][0]['title'])
        page.locator('#handoff-play').click()
        check('Playing a completed handoff restarts at the first responsibility')
        order = list(reversed(range(len(DATA['workflowSteps']))))
        for target in range(len(order)):
            pos = order.index(target)
            while pos > target:
                page.locator(f'[data-move="{pos}"][data-direction="-1"]').click()
                order[pos-1], order[pos] = order[pos], order[pos-1]
                pos -= 1
        page.locator('#handoff-check').click()
        expect(page.locator('#handoff-feedback')).to_contain_text('Sequence complete.')
        check('Handoff can be read, animated, reordered with buttons, and checked')

        route(page, f"learn/{LESSONS[0]['id']}")
        page.locator('#lesson-check').click()
        expect(page.locator('#quiz-filter')).to_have_value(LESSONS[0]['id'])
        lesson_questions = [q for q in QUESTIONS if q['lessonId'] == LESSONS[0]['id']]
        check_quiz_set(page, lesson_questions, wrong_first=True)
        expect(page.locator('#quiz-result')).to_contain_text(f'{len(lesson_questions)-1} / {len(lesson_questions)}')
        check('Lesson quiz records the actual first attempt', saved(page)['quizBest'] is None)
        page.locator('#quiz-filter').select_option('all')
        page.locator('#quiz-form button[type="submit"]').click()
        expect(page.locator('#quiz-feedback')).to_contain_text('Choose an answer')
        check_quiz_set(page, QUESTIONS)
        expect(page.locator('#quiz-result')).to_contain_text('42 / 42 correct · 100%')
        check('Full-course result stores a best score', saved(page)['quizBest'] == 100)
        page.reload()
        check('Best score persists after reload', saved(page)['quizBest'] == 100)

        route(page, 'reference')
        count = page.locator('#glossary-results article').count()
        page.locator('#glossary-search').fill('PMCS')
        check('Glossary search filters results', 0 < page.locator('#glossary-results article').count() < count)
        page.locator('#glossary-search').fill('zznotawordzz')
        expect(page.locator('#glossary-count')).to_contain_text('0 terms')
        page.locator('#glossary-search').fill('')
        expect(page.locator('#glossary-count')).to_contain_text(str(count))
        check('Reference page presents source-verification limitation', 'could not be independently checked' in page.locator('[data-view="reference"]').inner_text())

        for width in [1440, 390, 320]:
            page.set_viewport_size({'width': width, 'height': 1000 if width == 1440 else 844})
            for view in VIEWS:
                route(page, view)
                overflow(page, f'{view} fits {width}px viewport')
                if view in ['overview', 'walkaround', 'forms', 'leaks'] and width in [1440, 390]:
                    screenshot(page, f'{view}-{width}.png')
        page.set_viewport_size({'width': 1440, 'height': 1000})

        route(page, 'overview')
        page.evaluate("localStorage.setItem('unrelated-course-test', 'keep')")
        page.locator('#reset-progress').click()
        page.locator('#cancel-reset').click()
        check('Cancel keeps progress', saved(page)['quizBest'] == 100)
        page.locator('#reset-progress').click()
        page.locator('#confirm-reset').click()
        check('Confirmed reset clears only course progress', saved(page) == {'lessons': [], 'stations': [], 'quizBest': None} and page.evaluate("localStorage.getItem('unrelated-course-test')") == 'keep')

        reduced_context = browser.new_context(reduced_motion='reduce', viewport={'width': 390, 'height': 844})
        reduced = track(reduced_context.new_page())
        reduced.goto(f'{BASE}/91b/#walkaround')
        expect(reduced.locator('#station-play')).to_be_visible()
        reduced.locator('#station-play').click()
        animation = reduced.locator('.inspection-ring').evaluate('(el)=>getComputedStyle(el).animationName')
        check('Reduced motion suppresses truck pulse even during playback', animation == 'none')
        reduced.locator('#station-play').click()
        route(reduced, 'leaks')
        reduced.locator('[data-leak="III"]').click()
        reduced.locator('#leak-play').click()
        animation = reduced.locator('.leak-falling').evaluate('(el)=>getComputedStyle(el).animationName')
        check('Reduced motion suppresses fluid animation', animation == 'none')
        reduced_context.close()

        blocked_context = browser.new_context()
        blocked_context.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new Error('storage blocked for test')}})")
        blocked = track(blocked_context.new_page())
        blocked.goto(f'{BASE}/91b/#learn/{LESSONS[0]["id"]}')
        expect(blocked.locator('#lesson-complete')).to_be_visible()
        blocked.locator('#lesson-complete').click()
        expect(blocked.locator('#lesson-complete')).to_have_text('Reviewed ✓')
        expect(blocked.locator('#storage-status')).to_contain_text('storage is unavailable')
        check('Storage denial keeps the course usable with an honest notice')
        blocked_context.close()

        static_context = browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
        static = track(static_context.new_page())
        static.goto(f'{BASE}/91b/')
        expect(static.locator('noscript')).to_be_visible()
        expect(static.locator('noscript a[href="workbook.html"]')).to_be_visible()
        check('JavaScript-disabled entry offers complete reading edition')
        static.goto(f'{BASE}/91b/workbook.html')
        check('Workbook includes all lesson titles without JavaScript', all(l['title'] in static.locator('body').inner_text() for l in LESSONS))
        check('Workbook includes all scenario examples and answer explanations', all(s['expected']['fault'] in static.locator('body').inner_text() for s in SCENARIOS) and all(q['explanation'] in static.locator('body').inner_text() for q in QUESTIONS))
        overflow(static, 'Workbook fits 390px without JavaScript')
        static.set_viewport_size({'width': 320, 'height': 844})
        overflow(static, 'Workbook fits 320px without JavaScript')
        static.set_viewport_size({'width': 390, 'height': 844})
        print_path = ARTIFACTS / '91b-workbook.pdf'
        static.pdf(path=str(print_path), format='A4', print_background=True, margin={'top':'15mm','bottom':'15mm','left':'12mm','right':'12mm'})
        check('Complete reading edition can be printed as a PDF', print_path.read_bytes().startswith(b'%PDF') and print_path.stat().st_size > 50000)
        for lesson in LESSONS:
            response = static.goto(f'{BASE}/91b/lessons/{lesson["id"]}.html')
            check(f"Standalone lesson {lesson['id']} works without JavaScript", response.status == 200 and lesson['title'] in static.locator('h1').inner_text())
            overflow(static, f"Standalone lesson {lesson['id']} fits mobile")
        static_context.close()

        fallback_context = browser.new_context()
        fallback = fallback_context.new_page()
        fallback.route('**/91b/assets/*.js', lambda route: route.abort())
        fallback.goto(f'{BASE}/91b/')
        expect(fallback.locator('#startup-message')).to_be_visible()
        expect(fallback.locator('#startup-message a[href="workbook.html"]')).to_be_visible()
        fallback.locator('#startup-message a').click()
        expect(fallback.locator('h1')).to_be_visible()
        check('A missing bundle preserves a functioning ordinary reading link')
        fallback_context.close()

        keyboard = track(context.new_page())
        keyboard.goto(f'{BASE}/91b/')
        expect(keyboard.locator('#startup-message')).to_be_hidden()
        keyboard.keyboard.press('Tab')
        expect(keyboard.locator('.skip-link')).to_be_focused()
        keyboard.keyboard.press('Enter')
        expect(keyboard.locator('#main')).to_be_focused()
        check('Keyboard skip link moves focus to course content')
        keyboard.close()
        check('Course does not automatically request external websites', len(external_requests) == 0)
        check('No unexpected runtime, console, or local HTTP errors', len(errors) == 0)
        context.close()
        browser.close()
    (ARTIFACTS / 'results.json').write_text(json.dumps({'checks': len(checks), 'passed': checks, 'errors': errors, 'externalRequests': external_requests}, indent=2))
    print(f'\n{len(checks)} browser checks passed. Artifacts: {ARTIFACTS}', flush=True)


if __name__ == '__main__':
    main()
