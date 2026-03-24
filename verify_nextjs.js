const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Take a full page screenshot
    await page.screenshot({ path: 'verification/home_full.png', fullPage: true });

    // Check for "Shop Collection" button
    const shopButton = await page.getByRole('button', { name: /Shop Collection/i });
    if (await shopButton.isVisible()) {
      console.log('Shop Collection button is visible');
    } else {
      console.log('Shop Collection button NOT visible');
    }

    // Click "Shop Collection"
    await shopButton.click();
    await page.waitForURL('**/shop');
    console.log('Navigated to /shop');
    await page.screenshot({ path: 'verification/shop.png', fullPage: true });

    // Check for a product
    const product = await page.getByText('Black Dubai Cherry Borkha').first();
    if (await product.isVisible()) {
        console.log('Product "Black Dubai Cherry Borkha" is visible');
        await product.click();
        await page.waitForTimeout(1000); // Wait for navigation/render
        console.log('Navigated to product page: ' + page.url());
        await page.screenshot({ path: 'verification/product_detail.png', fullPage: true });
    } else {
        console.log('Product NOT visible on shop page');
    }

  } catch (error) {
    console.error('Verification failed:', error);
    await page.screenshot({ path: 'verification/error.png' });
  } finally {
    await browser.close();
  }
})();
