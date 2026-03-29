const { formatWhatsAppOrderUrl } = require('./whatsappUtils.js');

const STORE_CONFIG = {
    STORE_NAME: "Siloy Garments",
    WHATSAPP_NUMBER: "8801720099189",
};

const cart = [
    { name: 'Black Dubai Cherry Borkha', sku: 'BK-105', size: '54', qty: 1, price: 1500 },
    { name: 'Floral Linen 3-Piece Suit', sku: 'TP-201', size: 'L', qty: 2, price: 2890 }
];
const cartTotal = 7280;

function test() {
    console.log("Running tests for formatWhatsAppOrderUrl...");

    const result = formatWhatsAppOrderUrl(cart, cartTotal, STORE_CONFIG);

    const expectedMsg = `Hi Siloy Garments! I would like to order:\n\n- Black Dubai Cherry Borkha (SKU: BK-105)\n  Size: 54 | Qty: 1 | ৳1500\n- Floral Linen 3-Piece Suit (SKU: TP-201)\n  Size: L | Qty: 2 | ৳5780\n\n*Total: ৳7280*\n\nPlease confirm availability.`;
    const expectedUrl = `https://wa.me/8801720099189?text=${encodeURIComponent(expectedMsg)}`;

    if (result === expectedUrl) {
        console.log("✅ Standard order test passed!");
    } else {
        console.error("❌ Standard order test failed!");
        console.error("Expected:", expectedUrl);
        console.error("Got:     ", result);
        process.exit(1);
    }

    // Test with empty cart
    const emptyCartResult = formatWhatsAppOrderUrl([], 0, STORE_CONFIG);
    const expectedEmptyMsg = `Hi Siloy Garments! I would like to order:\n\n\n*Total: ৳0*\n\nPlease confirm availability.`;
    const expectedEmptyUrl = `https://wa.me/8801720099189?text=${encodeURIComponent(expectedEmptyMsg)}`;

    if (emptyCartResult === expectedEmptyUrl) {
        console.log("✅ Empty cart test passed!");
    } else {
        console.error("❌ Empty cart test failed!");
        process.exit(1);
    }

    // Test with special characters
    const specialCart = [{ name: 'Test & Item #1', sku: 'SKU?123', size: 'XL', qty: 1, price: 100 }];
    const specialResult = formatWhatsAppOrderUrl(specialCart, 100, STORE_CONFIG);
    if (specialResult.includes(encodeURIComponent('Test & Item #1'))) {
        console.log("✅ Special characters encoding test passed!");
    } else {
        console.error("❌ Special characters encoding test failed!");
        process.exit(1);
    }

    console.log("\nAll tests passed successfully!");
}

test();
