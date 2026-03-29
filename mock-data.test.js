const assert = require('assert');
const { getDiscountPercent } = require('./mock-data');

console.log('Running tests for getDiscountPercent...');

try {
    // Valid standard discounts
    assert.strictEqual(getDiscountPercent(80, 100), '20% OFF');
    assert.strictEqual(getDiscountPercent(1500, 1850), '19% OFF'); // (350/1850)*100 = 18.9%

    // Exact rounding
    assert.strictEqual(getDiscountPercent(99, 100), '1% OFF'); // (1/100) = 1%
    assert.strictEqual(getDiscountPercent(66, 100), '34% OFF'); // (34/100) = 34%

    // Edge Case: No oldPrice
    assert.strictEqual(getDiscountPercent(1500, null), null);
    assert.strictEqual(getDiscountPercent(1500, undefined), null);
    assert.strictEqual(getDiscountPercent(1500, 0), null);

    // Edge Case: Negative values
    assert.strictEqual(getDiscountPercent(-100, 200), null);
    assert.strictEqual(getDiscountPercent(100, -200), null);
    assert.strictEqual(getDiscountPercent(-100, -200), null);

    // Edge Case: Price is equal to or greater than oldPrice
    assert.strictEqual(getDiscountPercent(1500, 1500), null);
    assert.strictEqual(getDiscountPercent(2000, 1500), null);

    // Edge Case: Zero price
    assert.strictEqual(getDiscountPercent(0, 100), '100% OFF');

    console.log('✅ All getDiscountPercent tests passed!');
} catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
}
