function getDiscountPercent(price, oldPrice) {
    if (!oldPrice || oldPrice <= 0 || price < 0 || price >= oldPrice) {
        return null;
    }
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return `${Math.round(discount)}% OFF`;
}

const productsData = [
    { id: 1, name: 'Black Dubai Cherry Borkha', category: 'borkha', price: 1500, oldPrice: 1850, discount: getDiscountPercent(1500, 1850), img: 'https://images.unsplash.com/photo-1622290291468-7a9e5a64fd30?w=400&h=500&fit=crop', tag: 'Best Seller', sku: 'BK-105', rating: 4.9, reviews: 124, description: 'Premium Dubai Cherry fabric with elegant front-open design and intricate black-on-black embroidery.', sizes: ['52', '54', '56'] },
    { id: 2, name: 'Floral Linen 3-Piece Suit', category: '3-piece', price: 2890, oldPrice: 3200, discount: getDiscountPercent(2890, 3200), img: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=400&h=500&fit=crop', tag: 'New', sku: 'TP-201', rating: 4.8, reviews: 89, description: 'High-quality soft blush pink linen with detailed floral stitching. Perfect for daily luxury wear.', sizes: ['M', 'L', 'XL', 'XXL'] },
    { id: 3, name: 'Royal Silk Abaya with Hijab', category: 'borkha', price: 3450, oldPrice: 3800, discount: getDiscountPercent(3450, 3800), img: 'https://images.unsplash.com/photo-1614771685780-d1f4e47ef6d6?w=400&h=500&fit=crop', tag: 'Limited', sku: 'AB-303', rating: 5.0, reviews: 45, description: 'Exclusive royal silk blend imported from Dubai. Includes matching premium chiffon hijab.', sizes: ['52', '54', '56', '58'] },
    { id: 4, name: 'Minimalist Cotton 3-Piece', category: '3-piece', price: 1850, oldPrice: null, discount: getDiscountPercent(1850, null), img: 'https://images.unsplash.com/photo-1619603364853-e7bddf3985fe?w=400&h=500&fit=crop', tag: null, sku: 'TP-204', rating: 4.7, reviews: 210, description: 'Breathable pure cotton fabric ideal for summer. Features subtle embroidery on the neckline.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 5, name: 'Luxury Chiffon Hijab Set', category: 'hijab', price: 850, oldPrice: 1200, discount: getDiscountPercent(850, 1200), img: 'https://images.unsplash.com/photo-1558944331-a5570c0dc0c4?w=400&h=500&fit=crop', tag: 'Sale', sku: 'HJ-015', rating: 4.6, reviews: 312, description: 'Set of 3 premium chiffon hijabs in neutral tones. Lightweight and easy to drape.', sizes: ['Standard'] },
    { id: 6, name: 'Embroidered Party Gown', category: 'luxury', price: 5200, oldPrice: 6500, discount: getDiscountPercent(5200, 6500), img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop', tag: 'Premium', sku: 'GW-500', rating: 4.9, reviews: 22, description: 'Heavy zari embroidery on rich georgette fabric. Perfect for weddings and grand occasions.', sizes: ['38', '40', '42', '44'] }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getDiscountPercent, productsData };
}
