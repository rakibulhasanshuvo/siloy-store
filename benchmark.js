const { performance } = require('perf_hooks');

// Generate a large mock cart
const cart = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    price: Math.floor(Math.random() * 5000) + 100,
    qty: Math.floor(Math.random() * 5) + 1
}));

// Simulate 1000 re-renders
const numRenders = 10000;

function measureUnoptimized() {
    let total = 0;
    let count = 0;
    const start = performance.now();
    for (let i = 0; i < numRenders; i++) {
        // Unoptimized
        total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        count = cart.reduce((sum, item) => sum + item.qty, 0);
    }
    const end = performance.now();
    return end - start;
}

function measureOptimized() {
    let total = 0;
    let count = 0;

    // Simulate useMemo which only calculates once since `cart` reference doesn't change during re-renders
    const start = performance.now();

    // First render does the work
    const memoizedTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const memoizedCount = cart.reduce((sum, item) => sum + item.qty, 0);

    for (let i = 0; i < numRenders; i++) {
        total = memoizedTotal;
        count = memoizedCount;
    }
    const end = performance.now();
    return end - start;
}

const unoptimizedTime = measureUnoptimized();
const optimizedTime = measureOptimized();

console.log(`Unoptimized time for ${numRenders} renders with ${cart.length} items: ${unoptimizedTime.toFixed(2)}ms`);
console.log(`Optimized time for ${numRenders} renders with ${cart.length} items: ${optimizedTime.toFixed(2)}ms`);
console.log(`Improvement: ${(unoptimizedTime / optimizedTime).toFixed(2)}x faster`);
