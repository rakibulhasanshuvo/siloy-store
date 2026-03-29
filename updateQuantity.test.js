const assert = require('node:assert');
const test = require('node:test');
const fs = require('fs');

const htmlContent = fs.readFileSync('index.html', 'utf-8');
const match = htmlContent.match(/const updateCartItemQuantity = \(cart, id, size, change\) => \{[\s\S]*?\}\)\.filter\(item => item\.qty > 0\);\n        \};/);

if (!match) {
    throw new Error('updateCartItemQuantity function not found in index.html');
}

// Extract and evaluate the function
const updateCartItemQuantity = eval(`
    (function() {
        ${match[0]}
        return updateCartItemQuantity;
    })()
`);


test('updateCartItemQuantity', async (t) => {
    await t.test('should increase quantity', () => {
        const initialCart = [{ id: 1, size: 'M', qty: 1, price: 100 }];
        const newCart = updateCartItemQuantity(initialCart, 1, 'M', 1);

        assert.deepStrictEqual(newCart, [{ id: 1, size: 'M', qty: 2, price: 100 }]);
    });

    await t.test('should decrease quantity', () => {
        const initialCart = [{ id: 1, size: 'M', qty: 2, price: 100 }];
        const newCart = updateCartItemQuantity(initialCart, 1, 'M', -1);

        assert.deepStrictEqual(newCart, [{ id: 1, size: 'M', qty: 1, price: 100 }]);
    });

    await t.test('should remove item when quantity becomes 0', () => {
        const initialCart = [{ id: 1, size: 'M', qty: 1, price: 100 }];
        const newCart = updateCartItemQuantity(initialCart, 1, 'M', -1);

        assert.deepStrictEqual(newCart, []);
    });

    await t.test('should remove item when quantity becomes negative', () => {
        const initialCart = [{ id: 1, size: 'M', qty: 1, price: 100 }];
        const newCart = updateCartItemQuantity(initialCart, 1, 'M', -2);

        assert.deepStrictEqual(newCart, []);
    });

    await t.test('should not affect other items', () => {
        const initialCart = [
            { id: 1, size: 'M', qty: 1, price: 100 },
            { id: 2, size: 'L', qty: 1, price: 200 }
        ];
        const newCart = updateCartItemQuantity(initialCart, 1, 'M', 1);

        assert.deepStrictEqual(newCart, [
            { id: 1, size: 'M', qty: 2, price: 100 },
            { id: 2, size: 'L', qty: 1, price: 200 }
        ]);
    });

    await t.test('should not affect items with same id but different size', () => {
        const initialCart = [
            { id: 1, size: 'M', qty: 1, price: 100 },
            { id: 1, size: 'L', qty: 1, price: 100 }
        ];
        const newCart = updateCartItemQuantity(initialCart, 1, 'M', 1);

        assert.deepStrictEqual(newCart, [
            { id: 1, size: 'M', qty: 2, price: 100 },
            { id: 1, size: 'L', qty: 1, price: 100 }
        ]);
    });

    await t.test('should return unchanged cart array contents if item is not found', () => {
        const initialCart = [{ id: 1, size: 'M', qty: 1, price: 100 }];
        const newCart = updateCartItemQuantity(initialCart, 2, 'M', 1);

        assert.deepStrictEqual(newCart, initialCart);
        assert.notStrictEqual(newCart, initialCart); // Ensure it returns a new array reference
    });
});
