const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Product ${i} name`,
  category: i % 2 === 0 ? 'categoryA' : 'categoryB'
}));

const query = 'product 5';
let memoizedResults = null;
let lastQuery = null;
let lastProducts = null;

function filterWithoutUseMemo() {
  return query ? products.filter(p => p?.name?.toLowerCase().includes(query.toLowerCase()) || p?.category?.toLowerCase().includes(query.toLowerCase())) : [];
}

function filterWithMemoizationAndHoisting() {
  if (query === lastQuery && products === lastProducts) {
    return memoizedResults;
  }

  if (!query) {
    memoizedResults = [];
  } else {
    const lowerQuery = query.toLowerCase();
    memoizedResults = products.filter(p => p?.name?.toLowerCase().includes(lowerQuery) || p?.category?.toLowerCase().includes(lowerQuery));
  }

  lastQuery = query;
  lastProducts = products;

  return memoizedResults;
}

function benchmark(name, fn) {
  const start = process.hrtime.bigint();
  for (let i = 0; i < 10000; i++) {
    fn();
  }
  const end = process.hrtime.bigint();
  const timeMs = Number(end - start) / 1e6;
  console.log(`${name}: ${timeMs.toFixed(2)} ms`);
}

console.log("Benchmarking filtering logic (simulating 10,000 renders with 1000 products, where query hasn't changed)...");
benchmark("Without Optimization", filterWithoutUseMemo);
benchmark("With Memoization & Hoisting", filterWithMemoizationAndHoisting);