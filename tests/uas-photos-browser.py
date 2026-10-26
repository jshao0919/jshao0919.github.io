#!/usr/bin/env python3
"""Browser regression for optional Commons source-image study.

ALL Commons API and thumbnail responses are mocked. This verifies UI behavior,
privacy boundaries, failure handling, and provenance rendering; it does not
verify live Wikimedia availability, images, licenses, or aircraft identities.
Fixtures and synthetic image bytes exist only inside this test process.

Serve the repository at http://127.0.0.1:8770, then run:
    python tests/uas-photos-browser.py

Requires Python Playwright and Chromium outside the repository. Optional env:
BASE_URL, CHROMIUM_PATH, PHOTO_SCREENSHOT_DIR.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import struct
import subprocess
from urllib.parse import parse_qs, urlparse
import zlib

from playwright.sync_api import Error, expect, sync_playwright


ROOT = Path(__file__).resolve().parents[1]
BASE = os.environ.get("BASE_URL", "http://127.0.0.1:8770").rstrip("/")
OUT = Path(os.environ.get("PHOTO_SCREENSHOT_DIR", "/tmp/uas-photo-qa"))
OUT.mkdir(parents=True, exist_ok=True)
CATALOGUE = json.loads(subprocess.check_output([
    "node", "--input-type=module", "-e",
    "import {catalogue} from './uas/catalogue.js'; console.log(JSON.stringify(catalogue));",
], cwd=ROOT, text=True))
CHECKS: list[str] = []
SCRIPT_ERRORS: list[str] = []
UNEXPECTED_EXTERNAL: list[str] = []
LOCAL_FAILURES: list[str] = []


def check(name, condition):
    assert condition, name
    CHECKS.append(name)
    print(f"PASS: {name}", flush=True)


def mock_png(width=640, height=320):
    """A two-color rectangle, deliberately not an aircraft photograph."""
    def chunk(kind, payload):
        return struct.pack(">I", len(payload)) + kind + payload + struct.pack(">I", zlib.crc32(kind + payload))
    rows = b"".join(b"\0" + bytes((224, 235, 232) if y < height // 2 else (172, 194, 200)) * width for y in range(height))
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(rows)) + chunk(b"IEND", b"")


IMAGE_BYTES = mock_png()


def fixture(number=1, *, caption=None, creator=None):
    return {
        "pageid": number,
        "index": number,
        "title": f"File:MOCK TEST ONLY source {number}.png",
        "imageinfo": [{
            "mime": "image/png",
            "descriptionurl": f"https://commons.wikimedia.org/wiki/File:MOCK_TEST_ONLY_source_{number}.png",
            "thumburl": f"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/MOCK_TEST_ONLY_source_{number}.png/640px-MOCK_TEST_ONLY_source_{number}.png",
            "thumbwidth": 640,
            "thumbheight": 320,
            "timestamp": "2022-02-02T12:00:00Z",
            "extmetadata": {
                "Artist": {"value": creator or '<a href="https://example.invalid/artist">Mock Test Creator</a>'},
                "Credit": {"value": "Synthetic test fixture; no real photograph."},
                "ImageDescription": {"value": caption or "MOCK TEST ONLY: a neutral rectangle, not an aircraft image."},
                "License": {"value": "cc-by-sa-4.0"},
                "LicenseShortName": {"value": "CC BY-SA 4.0"},
                "LicenseUrl": {"value": "https://creativecommons.org/licenses/by-sa/4.0/"},
                "UsageTerms": {"value": "Creative Commons Attribution-Share Alike 4.0"},
                "Copyrighted": {"value": "True"},
                "DateTimeOriginal": {"value": "Source-stated date: 2020 (mock metadata)"},
            },
        }],
    }


def payload(*pages):
    return {"batchcomplete": True, "query": {"pages": list(pages)}}


class MockTransport:
    def __init__(self):
        self.mode = "success"
        self.data = payload(fixture())
        self.requests = []
        self.images = []
        self.pending = []
        self.failed_images = False

    def install(self, context):
        context.route("**/*", self.handle)

    def handle(self, route):
        request = route.request
        parsed = urlparse(request.url)
        if request.url.startswith(BASE + "/"):
            route.continue_()
            return
        if parsed.hostname == "commons.wikimedia.org" and parsed.path == "/w/api.php":
            self.requests.append({"url": request.url, "headers": request.all_headers(), "method": request.method})
            headers = {"access-control-allow-origin": "*", "content-type": "application/json"}
            if self.mode == "hold":
                self.pending.append(route)
            elif self.mode == "network-error":
                route.abort("failed")
            elif self.mode == "http-error":
                route.fulfill(status=503, headers=headers, body='{"error":"mock unavailable"}')
            elif self.mode == "malformed":
                route.fulfill(status=200, headers=headers, body="not valid JSON")
            elif self.mode == "api-error":
                route.fulfill(status=200, headers=headers, body=json.dumps({"error": {"code": "mock-error", "info": "Mock API unavailable"}}))
            else:
                route.fulfill(status=200, headers=headers, body=json.dumps(self.data))
            return
        if parsed.hostname == "upload.wikimedia.org" and parsed.path.startswith("/wikipedia/commons/"):
            self.images.append({"url": request.url, "headers": request.all_headers()})
            if self.failed_images:
                route.abort("failed")
            else:
                route.fulfill(status=200, content_type="image/png", body=IMAGE_BYTES)
            return
        UNEXPECTED_EXTERNAL.append(request.url)
        route.abort("blockedbyclient")

    def release(self, data=None):
        for route in self.pending:
            try:
                route.fulfill(status=200, headers={"access-control-allow-origin": "*", "content-type": "application/json"}, body=json.dumps(data or self.data))
            except Error:
                # Browser transport can already be aborted by navigation.
                pass
        self.pending.clear()


def tracked_page(context):
    page = context.new_page()
    page.on("pageerror", lambda error: SCRIPT_ERRORS.append(str(error)))
    page.on("response", lambda response: LOCAL_FAILURES.append(f"{response.status} {response.url}") if response.url.startswith(BASE) and response.status >= 400 else None)
    return page


def study(page, asset_id):
    page.evaluate("id => { location.hash = `study/${id}`; }", asset_id)
    expect(page.locator('[data-view="study"]')).to_be_visible()
    expect(page.locator("#study-model")).to_have_value(asset_id)
    expected_name = next(asset["name"] for asset in CATALOGUE if asset["id"] == asset_id)
    expect(page.locator("#study-model-title")).to_have_text(expected_name)


def load(page):
    page.locator("#load-source-photos").click()
    expect(page.locator("#photo-results")).to_have_attribute("aria-busy", "false")


def screenshot(page, filename):
    page.evaluate("""() => {
      const old=document.getElementById('test-only-banner'); if(old) old.remove();
      const banner=document.createElement('p'); banner.id='test-only-banner';
      banner.textContent='MOCK BROWSER TEST · synthetic rectangle, not a real source photograph';
      banner.style='padding:12px;background:#fff1c9;color:#342800;font-weight:bold';
      document.getElementById('photo-results').prepend(banner);
    }""")
    # Chromium can include an offscreen fixed skip link in tall element captures.
    page.locator(".photo-study").screenshot(path=str(OUT / filename), style=".skip-link { visibility: hidden !important; }")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH", "/usr/bin/chromium"), headless=True, args=["--no-sandbox"])
        context = browser.new_context(viewport={"width": 1440, "height": 1000})
        transport = MockTransport()
        transport.install(context)
        page = tracked_page(context)
        page.goto(f"{BASE}/uas/")
        expect(page.locator("#asset-count")).to_have_text(str(len(CATALOGUE)))
        check("Initial course load sends no Commons/API/image requests", not transport.requests and not transport.images)
        for asset in CATALOGUE:
            study(page, asset["id"])
            expect(page.locator("#photo-status")).to_contain_text("No external images have been requested")
            check(f"Study record {asset['id']} resolves title, vocabulary, and optional query", page.locator(".design-vocabulary dt").count() >= 3 and page.locator("#photo-query option").count() >= 1)
        check("All32 model pages remain opt-in with no image fetch", not transport.requests and not transport.images)
        study(page, "ababil-4-5")
        check("Grouped labels have separate source queries", page.locator("#photo-query option").all_text_contents() == ["Ababil-4", "Ababil-5"])
        page.locator("#photo-query").select_option("Ababil-5")
        check("Changing a search name does not contact Commons", not transport.requests)
        check("Manual search URL uses only the chosen designation", parse_qs(urlparse(page.locator("#commons-search-link").get_attribute("href")).query)["search"] == ['"Ababil-5"'])
        load(page)
        expect(page.locator(".photo-card")).to_have_count(1)
        expect(page.locator(".photo-card img")).to_be_visible()
        page.locator(".photo-card img").scroll_into_view_if_needed()
        page.wait_for_function("document.querySelector('.photo-card img')?.naturalWidth === 640")
        params = parse_qs(urlparse(transport.requests[-1]["url"]).query)
        check("Opt-in API request uses exact selected variant and six-result limit", params["gsrsearch"] == ['"Ababil-5"'] and params["gsrlimit"] == ["6"])
        check("API request omits cookies and referrer", "cookie" not in transport.requests[-1]["headers"] and "referer" not in transport.requests[-1]["headers"])
        check("Thumbnail request does not disclose referrer", transport.images and all("referer" not in request["headers"] for request in transport.images))
        card = page.locator(".photo-card")
        expect(card).to_contain_text("Mock Test Creator")
        expect(card).to_contain_text("Synthetic test fixture; no real photograph")
        expect(card).to_contain_text("Source-stated date: 2020")
        expect(card).to_contain_text("CC BY-SA 4.0")
        check("Original caption, creator, source, and reuse link are visible", card.locator('a[href^="https://commons.wikimedia.org/wiki/File:"]').count() == 1 and card.locator('a[href="https://creativecommons.org/licenses/by-sa/4.0/"]').count() == 1)
        check("Images are explicitly unreviewed candidates with unverified model identity", "model identity not verified" in card.inner_text().lower() and "not verified" in card.locator("img").get_attribute("alt"))
        check("Image presentation retains full composition", card.locator("img").evaluate("node => getComputedStyle(node).objectFit") == "contain")
        check("External attribution links protect opener and referrer", card.locator('a[target="_blank"]').evaluate_all("nodes => nodes.every(node => node.rel.includes('noopener') && node.rel.includes('noreferrer'))"))
        screenshot(page, "mock-desktop-photo-study.png")

        # Date fallback must identify upload/file revision time, not a capture date.
        dated = fixture(2)
        del dated["imageinfo"][0]["extmetadata"]["DateTimeOriginal"]
        transport.data = payload(dated)
        load(page)
        expect(page.locator(".photo-card")).to_contain_text("File revision timestamp: 2022-02-02T12:00:00Z")
        check("Missing original date is not presented as an inferred capture date", "File revision timestamp" in page.locator(".photo-card").inner_text())

        # Source HTML is never attached as markup, and unsafe files are omitted.
        malicious = fixture(3, caption='<img src="https://evil.invalid/x" onerror="window.metadataExecuted=true">A caption &amp; details<script>window.metadataExecuted=true</script>', creator='&lt;img src=x onerror="window.metadataExecuted=true"&gt;Test &amp; Creator')
        malicious["imageinfo"][0]["extmetadata"]["Credit"]["value"] = '<a href="javascript:window.metadataExecuted=true">Plain credit</a>'
        transport.data = payload(malicious)
        load(page)
        expect(page.locator(".photo-card")).to_contain_text("A caption & details")
        expect(page.locator(".photo-card")).to_contain_text("Test & Creator")
        check("Source metadata becomes inert text without injected elements", page.locator(".photo-card script, .photo-caption img, .photo-metadata img, .photo-card [onerror]").count() == 0 and page.evaluate("window.metadataExecuted !== true"))
        invalid_license, invalid_thumb, invalid_source, invalid_mime, missing_creator = (fixture(i) for i in range(4, 9))
        for key in ["License", "LicenseShortName", "LicenseUrl", "UsageTerms", "Copyrighted"]:
            invalid_license["imageinfo"][0]["extmetadata"].pop(key, None)
        invalid_thumb["imageinfo"][0]["thumburl"] = "https://evil.invalid/thumb.png"
        invalid_source["imageinfo"][0]["descriptionurl"] = "javascript:alert(1)"
        invalid_mime["imageinfo"][0]["mime"] = "image/svg+xml"
        del missing_creator["imageinfo"][0]["extmetadata"]["Artist"]
        transport.data = payload(fixture(18), invalid_license, invalid_thumb, invalid_source, invalid_mime, missing_creator)
        load(page)
        expect(page.locator(".photo-card")).to_have_count(1)
        expect(page.locator("#photo-status")).to_contain_text("5 result(s) were omitted")
        check("Missing-license/creator, unsafe-URL, and unsupported-format candidates are omitted", "MOCK TEST ONLY source 18" in page.locator(".photo-card").inner_text())
        check("Untrusted source metadata triggered no third-party requests", not UNEXPECTED_EXTERNAL)

        # Explicitly distinguish empty, HTTP, network, API, malformed, and image errors.
        transport.data = payload()
        load(page)
        expect(page.locator("#photo-status")).to_contain_text("No source images meeting")
        check("Empty search preserves direct source link without substitute model", page.locator(".photo-card").count() == 0 and "No photograph is substituted" in page.locator("#photo-status").inner_text() and page.locator("#commons-search-link").is_visible())
        for mode, text in [("http-error", "HTTP 503"), ("network-error", "Images could not be loaded"), ("api-error", "Mock API unavailable"), ("malformed", "malformed image metadata")]:
            transport.mode = mode
            load(page)
            expect(page.locator("#photo-status")).to_contain_text(text)
            check(f"{mode} gives recoverable error without verified-photo claim", page.locator("#load-source-photos").is_enabled() and "No model photograph has been verified" in page.locator("#photo-status").inner_text())
        transport.mode, transport.data, transport.failed_images = "success", payload(fixture(9)), True
        load(page)
        page.locator(".photo-image-wrap").scroll_into_view_if_needed()
        expect(page.locator(".image-unavailable")).to_be_visible()
        expect(page.locator(".photo-card img")).not_to_be_visible()
        check("Broken thumbnail leaves caption and attribution links available", page.locator(".photo-card figcaption").is_visible() and page.locator('.photo-card a[href^="https://commons.wikimedia.org/wiki/File:"]').is_visible())
        transport.failed_images = False

        # Requests are cancelled by route/query changes. Late results stay hidden.
        study(page, "ababil-4-5")
        transport.mode = "hold"
        page.locator("#load-source-photos").click()
        expect(page.locator("#photo-results")).to_have_attribute("aria-busy", "true")
        expect(page.locator("#load-source-photos")).to_be_disabled()
        check("Loading state communicates progress and prevents duplicate submission", len(transport.pending) == 1)
        page.locator("#photo-query").select_option("Ababil-5")
        expect(page.locator("#photo-results")).to_have_attribute("aria-busy", "false")
        expect(page.locator("#load-source-photos")).to_be_enabled()
        transport.release(payload(fixture(10)))
        page.wait_for_timeout(80)
        check("Changing selected query clears stale results without fetching automatically", page.locator(".photo-card").count() == 0 and "No images requested for this name" in page.locator("#photo-status").inner_text())
        page.locator("#load-source-photos").click()
        expect(page.locator("#photo-results")).to_have_attribute("aria-busy", "true")
        request_count = len(transport.requests)
        study(page, "shahed-136")
        transport.release(payload(fixture(11)))
        page.wait_for_timeout(80)
        check("Model change cancels prior lookup and never repopulates new model with old images", page.locator(".photo-card").count() == 0 and len(transport.requests) == request_count and "No external images" in page.locator("#photo-status").inner_text())
        transport.mode, transport.data = "success", payload(fixture(12))
        load(page)
        expect(page.locator(".photo-card")).to_have_count(1)
        check("New model uses its own explicit request after cancellation", parse_qs(urlparse(transport.requests[-1]["url"]).query)["gsrsearch"] == ['"Shahed-136"'])

        # Ordinary links open model records independently from the course router.
        page.evaluate("location.hash = 'atlas'")
        expect(page.locator('[data-view="atlas"]')).to_be_visible()
        card_study = page.locator('#atlas-grid a[href^="models/"]').first
        target_id = Path(card_study.get_attribute("href")).stem
        card_study.click()
        expect(page.locator("body")).to_have_attribute("data-model-id", target_id)
        check("Atlas card opens corresponding independent model page", page.url.endswith(f"/models/{target_id}.html"))
        page.goto(f"{BASE}/uas/#atlas")
        page.locator("[data-open]").first.click()
        page.locator('#asset-dialog-body a[href^="models/"]').click()
        expect(page.locator("body")).to_have_attribute("data-model-id", target_id)
        check("Atlas detail dialog opens matching independent model page", page.locator("#study-model-title").is_visible())
        page.goto(f"{BASE}/uas/#study/ababil-2")
        count_before = len(transport.requests)
        page.locator("#study-model").select_option("karrar")
        expect(page.locator("#study-model")).to_have_value("karrar")
        check("Changing model selector remains opt-in", len(transport.requests) == count_before)
        load(page)
        check("Ambiguous common name gets documented generic search qualifier", parse_qs(urlparse(transport.requests[-1]["url"]).query)["gsrsearch"] == ['"Karrar" drone'])

        for width in [390, 320]:
            mobile_context = browser.new_context(viewport={"width": width, "height": 844}, is_mobile=True, has_touch=True)
            mobile_transport = MockTransport()
            mobile_transport.install(mobile_context)
            mobile = tracked_page(mobile_context)
            mobile.goto(f"{BASE}/uas/#study/shahed-136")
            expect(mobile.locator("#study-model")).to_have_value("shahed-136")
            check(f"{width}px study does not request photos on initial navigation", not mobile_transport.requests)
            load(mobile)
            expect(mobile.locator(".photo-card")).to_have_count(1)
            mobile.locator(".photo-card img").scroll_into_view_if_needed()
            mobile.wait_for_function("document.querySelector('.photo-card img')?.naturalWidth === 640")
            check(f"{width}px study and attributed image have no outer overflow", mobile.evaluate("document.documentElement.scrollWidth <= innerWidth"))
            check(f"{width}px image is contained without cropping", mobile.locator(".photo-card img").evaluate("node => getComputedStyle(node).objectFit === 'contain' && node.getBoundingClientRect().width <= innerWidth"))
            screenshot(mobile, f"mock-mobile-{width}-photo-study.png")
            mobile_context.close()

        # A bounded stalled request fails visibly and permits retry, without a real wait.
        timeout_context = browser.new_context()
        timeout_transport = MockTransport()
        timeout_transport.mode = "hold"
        timeout_transport.install(timeout_context)
        timeout_page = tracked_page(timeout_context)
        timeout_page.clock.install()
        timeout_page.goto(f"{BASE}/uas/#study/shahed-136")
        timeout_page.locator("#load-source-photos").click()
        expect(timeout_page.locator("#photo-results")).to_have_attribute("aria-busy", "true")
        timeout_page.clock.fast_forward(13000)
        expect(timeout_page.locator("#photo-status")).to_contain_text("timed out")
        check("Stalled image query times out with a usable retry control", timeout_page.locator("#load-source-photos").is_enabled())
        timeout_transport.release()
        timeout_context.close()

        check("No unexpected external request escaped mocks", not UNEXPECTED_EXTERNAL)
        check("No browser script errors or local-resource failures", not SCRIPT_ERRORS and not LOCAL_FAILURES)
        context.close()
        browser.close()

    (OUT / "results.json").write_text(json.dumps({
        "verification": "MOCKED BROWSER ONLY; no live Commons availability, photographs, attribution, licenses, or model identities verified",
        "checks": len(CHECKS), "passed": CHECKS,
        "scriptErrors": SCRIPT_ERRORS, "unexpectedExternalRequests": UNEXPECTED_EXTERNAL,
        "localResourceFailures": LOCAL_FAILURES,
    }, indent=2) + "\n")
    print(f"\n{len(CHECKS)} MOCKED photo browser checks passed. No live image-service claim. Artifacts: {OUT}")


if __name__ == "__main__":
    main()
