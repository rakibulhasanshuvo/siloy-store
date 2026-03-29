const { performance } = require('perf_hooks');

// Mock data
const products = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Product ${i}`,
    category: i % 2 === 0 ? 'borkha' : '3-piece',
    price: Math.random() * 5000,
    reviews: Math.floor(Math.random() * 500)
}));

const filter = 'All';
const search = '';
const sortBy = 'popularity';

function simulateRenderNoMemo() {
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

    const displayProducts = products.filter(p => {
        const matchesFilter = filter === 'All' || (p?.category || '').toLowerCase().replace(/[\s-]/g, '') === filter.toLowerCase().replace(/[\s-]/g, '');
        const matchesSearch = p?.name?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'price_low': return a.price - b.price;
            case 'price_high': return b.price - a.price;
            case 'newest': return b.id - a.id;
            case 'popularity': default: return (b.reviews || 0) - (a.reviews || 0);
        }
    });
    return displayProducts.length;
}

// simulate useMemo
let memoizedCategories;
let memoizedProducts;

function simulateRenderMemo() {
    if (!memoizedCategories) {
        memoizedCategories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
    }
    const categories = memoizedCategories;

    if (!memoizedProducts) {
        memoizedProducts = products.filter(p => {
            const matchesFilter = filter === 'All' || (p?.category || '').toLowerCase().replace(/[\s-]/g, '') === filter.toLowerCase().replace(/[\s-]/g, '');
            const matchesSearch = p?.name?.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        }).sort((a, b) => {
            switch (sortBy) {
                case 'price_low': return a.price - b.price;
                case 'price_high': return b.price - a.price;
                case 'newest': return b.id - a.id;
                case 'popularity': default: return (b.reviews || 0) - (a.reviews || 0);
            }
        });
    }
    const displayProducts = memoizedProducts;
    return displayProducts.length;
}

const iterations = 1000;

// Benchmark No Memo
const startNoMemo = performance.now();
for (let i = 0; i < iterations; i++) {
    simulateRenderNoMemo();
}
const endNoMemo = performance.now();
console.log(`Baseline (No useMemo) time: ${(endNoMemo - startNoMemo).toFixed(2)} ms`);

// Benchmark Memo
const startMemo = performance.now();
for (let i = 0; i < iterations; i++) {
    simulateRenderMemo();
}
const endMemo = performance.now();
console.log(`Optimized (With useMemo) time: ${(endMemo - startMemo).toFixed(2)} ms`);
