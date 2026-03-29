// Mock data and function to benchmark
const products = Array.from({ length: 10000 }).map((_, i) => ({
  id: i,
  name: `Product ${i} name`,
  category: `Category ${i % 10}`
}));

const query = 'Product 500';

function measurePerformance(func, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    func();
  }
  const end = performance.now();
  return end - start;
}

const withoutMemo = () => {
  return query ? products.filter(p => p?.name?.toLowerCase().includes(query.toLowerCase()) || p?.category?.toLowerCase().includes(query.toLowerCase())) : [];
};

console.log(`Time taken without memo: ${measurePerformance(withoutMemo)}ms`);

const cachedResult = withoutMemo();

const withMemo = () => {
    // Simulated memoization: only computed once if deps don't change
    return cachedResult;
}

console.log(`Time taken with memo (when deps don't change): ${measurePerformance(withMemo)}ms`);
