const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>\s*(const cartLogic = \{[\s\S]*?\});?\s*<\/script>/);

if (!scriptMatch) {
    throw new Error('Could not find cartLogic block in index.html');
}

let loadedCartLogic = eval(scriptMatch[1].replace('const cartLogic', 'cartLogic') + '\n; cartLogic;');

test('updateQuantity: increases quantity of an existing item', () => {
    const cart = [{ id: 1, size: 'M', qty: 2, price: 10 }];
    const result = loadedCartLogic.updateQuantity(cart, 1, 'M', 1);
    assert.deepStrictEqual(result, [{ id: 1, size: 'M', qty: 3, price: 10 }]);
});

test('updateQuantity: decreases quantity of an existing item', () => {
    const cart = [{ id: 1, size: 'M', qty: 2, price: 10 }];
    const result = loadedCartLogic.updateQuantity(cart, 1, 'M', -1);
    assert.deepStrictEqual(result, [{ id: 1, size: 'M', qty: 1, price: 10 }]);
});

test('updateQuantity: removes item when quantity drops to 0', () => {
    const cart = [{ id: 1, size: 'M', qty: 1, price: 10 }, { id: 2, size: 'L', qty: 1, price: 20 }];
    const result = loadedCartLogic.updateQuantity(cart, 1, 'M', -1);
    assert.deepStrictEqual(result, [{ id: 2, size: 'L', qty: 1, price: 20 }]);
});

test('updateQuantity: removes item when quantity drops below 0', () => {
    const cart = [{ id: 1, size: 'M', qty: 1, price: 10 }];
    const result = loadedCartLogic.updateQuantity(cart, 1, 'M', -2);
    assert.deepStrictEqual(result, []);
});

test('updateQuantity: does not modify other items or wrong sizes', () => {
    const cart = [
        { id: 1, size: 'M', qty: 2, price: 10 },
        { id: 1, size: 'L', qty: 1, price: 10 }
    ];
    const result = loadedCartLogic.updateQuantity(cart, 1, 'M', 1);
    assert.deepStrictEqual(result, [
        { id: 1, size: 'M', qty: 3, price: 10 },
        { id: 1, size: 'L', qty: 1, price: 10 }
    ]);
});

test('updateQuantity: returns unchanged cart if item not found', () => {
    const cart = [{ id: 1, size: 'M', qty: 2, price: 10 }];
    const result = loadedCartLogic.updateQuantity(cart, 2, 'M', 1);
    assert.deepStrictEqual(result, [{ id: 1, size: 'M', qty: 2, price: 10 }]);
});
