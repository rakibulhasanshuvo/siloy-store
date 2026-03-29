const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

// Read index.html and extract the pure functions
const indexPath = path.join(__dirname, '../index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

// Use regex to extract the block containing our logic
const logicBlockMatch = indexHtml.match(/\/\/ --- Pure Cart Logic for Testing ---\s*([\s\S]*?)\s*const AppProvider =/);

if (!logicBlockMatch) {
    throw new Error('Could not extract pure cart logic from index.html. Ensure the marker comments are present.');
}

// Evaluate the extracted block in this context
const extractedCode = logicBlockMatch[1];
// Change const to let or global variables so they are accessible outside eval scope in strict mode (node test runs with module scoping context)
// A safer way is to return them from a function
const getCartLogic = new Function(`
    ${extractedCode}
    return { addToCartLogic, removeFromCartLogic, updateQuantityLogic };
`);

const { addToCartLogic, removeFromCartLogic, updateQuantityLogic } = getCartLogic();

// Tests
test('Cart Logic', async (t) => {

    await t.test('addToCartLogic', async (st) => {
        await st.test('adds a new product to an empty cart', () => {
            const initialCart = [];
            const product = { id: 1, name: 'Borkha', price: 1500 };

            const result = addToCartLogic(initialCart, product, 'M', 1);

            assert.deepEqual(result, [
                { id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 1 }
            ]);
            // Ensure original cart is mutated or new array is returned (immutability check)
            assert.notEqual(result, initialCart);
        });

        await st.test('adds a new product to an existing cart', () => {
            const initialCart = [{ id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 1 }];
            const newProduct = { id: 2, name: 'Hijab', price: 500 };

            const result = addToCartLogic(initialCart, newProduct, 'L', 2);

            assert.deepEqual(result, [
                { id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 1 },
                { id: 2, name: 'Hijab', price: 500, size: 'L', qty: 2 }
            ]);
        });

        await st.test('increments quantity if product and size already exist', () => {
            const initialCart = [{ id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 1 }];
            const product = { id: 1, name: 'Borkha', price: 1500 };

            const result = addToCartLogic(initialCart, product, 'M', 2);

            assert.deepEqual(result, [
                { id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 3 }
            ]);
        });

        await st.test('adds as new item if product exists but size is different', () => {
            const initialCart = [{ id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 1 }];
            const product = { id: 1, name: 'Borkha', price: 1500 };

            const result = addToCartLogic(initialCart, product, 'L', 1);

            assert.deepEqual(result, [
                { id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 1 },
                { id: 1, name: 'Borkha', price: 1500, size: 'L', qty: 1 }
            ]);
        });

        await st.test('defaults qty to 1 if not provided', () => {
            const initialCart = [];
            const product = { id: 1, name: 'Borkha', price: 1500 };

            const result = addToCartLogic(initialCart, product, 'M');

            assert.deepEqual(result, [
                { id: 1, name: 'Borkha', price: 1500, size: 'M', qty: 1 }
            ]);
        });
    });

    await t.test('removeFromCartLogic', async (st) => {
        await st.test('removes the specified product and size', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 },
                { id: 2, size: 'L', qty: 2 }
            ];

            const result = removeFromCartLogic(initialCart, 1, 'M');

            assert.deepEqual(result, [
                { id: 2, size: 'L', qty: 2 }
            ]);
        });

        await st.test('does not remove if size does not match', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 }
            ];

            const result = removeFromCartLogic(initialCart, 1, 'L');

            assert.deepEqual(result, [
                { id: 1, size: 'M', qty: 1 }
            ]);
        });

        await st.test('does not remove if id does not match', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 }
            ];

            const result = removeFromCartLogic(initialCart, 2, 'M');

            assert.deepEqual(result, [
                { id: 1, size: 'M', qty: 1 }
            ]);
        });

        await st.test('handles empty cart', () => {
            const initialCart = [];

            const result = removeFromCartLogic(initialCart, 1, 'M');

            assert.deepEqual(result, []);
        });
    });

    await t.test('updateQuantityLogic', async (st) => {
        await st.test('increases quantity correctly', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 }
            ];

            const result = updateQuantityLogic(initialCart, 1, 'M', 1);

            assert.deepEqual(result, [
                { id: 1, size: 'M', qty: 2 }
            ]);
        });

        await st.test('decreases quantity correctly', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 2 }
            ];

            const result = updateQuantityLogic(initialCart, 1, 'M', -1);

            assert.deepEqual(result, [
                { id: 1, size: 'M', qty: 1 }
            ]);
        });

        await st.test('removes item if quantity reaches 0', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 },
                { id: 2, size: 'L', qty: 2 }
            ];

            const result = updateQuantityLogic(initialCart, 1, 'M', -1);

            assert.deepEqual(result, [
                { id: 2, size: 'L', qty: 2 }
            ]);
        });

        await st.test('removes item if quantity goes below 0', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 }
            ];

            const result = updateQuantityLogic(initialCart, 1, 'M', -2);

            assert.deepEqual(result, []);
        });

        await st.test('does nothing if item not found', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 }
            ];

            const result = updateQuantityLogic(initialCart, 2, 'M', 1);

            assert.deepEqual(result, [
                { id: 1, size: 'M', qty: 1 }
            ]);
        });

        await st.test('only updates matching size', () => {
            const initialCart = [
                { id: 1, size: 'M', qty: 1 },
                { id: 1, size: 'L', qty: 1 }
            ];

            const result = updateQuantityLogic(initialCart, 1, 'M', 2);

            assert.deepEqual(result, [
                { id: 1, size: 'M', qty: 3 },
                { id: 1, size: 'L', qty: 1 }
            ]);
        });
    });
});
