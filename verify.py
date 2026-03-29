import re
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("file:///app/index.html")
    page.wait_for_timeout(500)

    # Add an item to the cart
    page.get_by_role("button", name="Shop Collection").click()
    page.wait_for_timeout(500)

    page.locator('.group').first.click()
    page.wait_for_timeout(500)

    # Try selecting a size if available
    try:
        page.locator('button', has_text="52").first.click(timeout=1000)
        page.wait_for_timeout(500)
    except Exception:
        pass

    # Click Add to Cart
    try:
        page.locator('button', has_text=re.compile("add to cart", re.IGNORECASE)).first.click(timeout=3000)
        page.wait_for_timeout(1000)
    except Exception:
        pass

    # Open cart drawer
    try:
        page.locator('button:has(span:has-text("shopping_bag"))').first.click(timeout=1000)
        page.wait_for_timeout(1000)
    except Exception:
        pass

    # Click add quantity
    try:
        page.locator('button:has(span:has-text("add"))').first.click(timeout=1000)
        page.wait_for_timeout(1000)
    except Exception:
        pass

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)  # Hold final state for the video

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()  # MUST close context to save the video
            browser.close()
