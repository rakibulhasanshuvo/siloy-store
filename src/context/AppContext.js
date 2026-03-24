"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// ============================================================
//  ⚙️  STORE CONFIGURATION
// ============================================================
export const STORE_CONFIG = {
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJnY-H4_VtAlMZSmrCr6H-WBzo-gwnwzLwZWGeprh762VX5u03JGYwe__flE6XK3yci740-AxD7RRx/pub?output=csv",
    WHATSAPP_NUMBER: "8801720099189",
    STORE_NAME: "Siloy Garments",
};

const productsData = [
    { id: 1, name: 'Black Dubai Cherry Borkha', category: 'borkha', price: 1500, oldPrice: 1850, discount: '20% OFF', img: '/images/placeholder.gif', tag: 'Best Seller', sku: 'BK-105', rating: 4.9, reviews: 124, description: 'Premium Dubai Cherry fabric with elegant front-open design and intricate black-on-black embroidery.', sizes: ['52', '54', '56'] },
    { id: 2, name: 'Floral Linen 3-Piece Suit', category: '3-piece', price: 2890, oldPrice: 3200, img: '/images/placeholder.gif', tag: 'New', sku: 'TP-201', rating: 4.8, reviews: 89, description: 'High-quality soft blush pink linen with detailed floral stitching. Perfect for daily luxury wear.', sizes: ['M', 'L', 'XL', 'XXL'] },
    { id: 3, name: 'Royal Silk Abaya with Hijab', category: 'borkha', price: 3450, oldPrice: 3800, img: '/images/placeholder.gif', tag: 'Limited', sku: 'AB-303', rating: 5.0, reviews: 45, description: 'Exclusive royal silk blend imported from Dubai. Includes matching premium chiffon hijab.', sizes: ['52', '54', '56', '58'] },
    { id: 4, name: 'Minimalist Cotton 3-Piece', category: '3-piece', price: 1850, oldPrice: null, img: '/images/placeholder.gif', tag: null, sku: 'TP-204', rating: 4.7, reviews: 210, description: 'Breathable pure cotton fabric ideal for summer. Features subtle embroidery on the neckline.', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 5, name: 'Luxury Chiffon Hijab Set', category: 'hijab', price: 850, oldPrice: 1200, img: '/images/placeholder.gif', tag: 'Sale', sku: 'HJ-015', rating: 4.6, reviews: 312, description: 'Set of 3 premium chiffon hijabs in neutral tones. Lightweight and easy to drape.', sizes: ['Standard'] },
    { id: 6, name: 'Embroidered Party Gown', category: 'luxury', price: 5200, oldPrice: 6500, img: '/images/placeholder.gif', tag: 'Premium', sku: 'GW-500', rating: 4.9, reviews: 22, description: 'Heavy zari embroidery on rich georgette fabric. Perfect for weddings and grand occasions.', sizes: ['38', '40', '42', '44'] }
];

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState(productsData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartPopping, setIsCartPopping] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!STORE_CONFIG.SHEET_URL || STORE_CONFIG.SHEET_URL === "PASTE_YOUR_GOOGLE_SHEET_CSV_LINK_HERE") {
                setProducts(productsData);
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(STORE_CONFIG.SHEET_URL);
                if (!response.ok) throw new Error("Failed to fetch Google Sheet");
                const csvText = await response.text();

                if (csvText.trim().startsWith('<')) throw new Error("Google Sheet is not published correctly.");

                const lines = [];
                let currentLine = '', inQuotes = false;
                for (let i = 0; i < csvText.length; i++) {
                    const ch = csvText[i];
                    if (ch === '"') {
                        inQuotes = !inQuotes;
                        currentLine += ch;
                    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
                        if (ch === '\r' && csvText[i + 1] === '\n') i++;
                        if (currentLine.trim()) lines.push(currentLine);
                        currentLine = '';
                    } else {
                        currentLine += ch;
                    }
                }
                if (currentLine.trim()) lines.push(currentLine);

                const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

                const parsedProducts = lines.slice(1).map((line, index) => {
                    const values = [];
                    let current = '', inQuotes = false;
                    for (let i = 0; i < line.length; i++) {
                        const ch = line[i];
                        if (ch === '"') {
                            inQuotes = !inQuotes;
                        } else if (ch === ',' && !inQuotes) {
                            values.push(current.trim());
                            current = '';
                        } else {
                            current += ch;
                        }
                    }
                    values.push(current.trim());

                    const product = { id: index + 1 };
                    headers.forEach((header, i) => {
                        let val = values[i] !== undefined ? values[i] : null;
                        if (header === 'price' || header === 'oldprice') {
                            product[header] = val && val !== 'null' && val !== '' ? Number(val) : null;
                        } else if (header === 'sizes') {
                            product[header] = val ? val.split(',').map(s => s.trim()) : [];
                        } else if (header === 'rating' || header === 'reviews') {
                            product[header] = val && val !== '' ? Number(val) : 0;
                        } else if (header === 'tag') {
                            product[header] = val && val.toLowerCase() !== 'null' && val !== '' ? val : null;
                        } else {
                            product[header] = val && val !== '' ? val : null;
                        }
                    });
                    return product;
                });

                setProducts(parsedProducts);
            } catch (err) {
                console.error("Error loading products:", err);
                setProducts(productsData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = useCallback((product, size, qty = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.size === size);
            if (existing) {
                return prev.map(item => item.id === product.id && item.size === size
                    ? { ...item, qty: item.qty + qty } : item);
            }
            return [...prev, { ...product, size, qty }];
        });
        setIsCartOpen(true);
        setIsCartPopping(true);
        setTimeout(() => setIsCartPopping(false), 400);
    }, []);

    const removeFromCart = useCallback((id, size) => {
        setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
    }, []);

    const updateQuantity = useCallback((id, size, change) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === id && item.size === size) {
                    const newQty = item.qty + change;
                    return { ...item, qty: newQty };
                }
                return item;
            }).filter(item => item.qty > 0);
        });
    }, []);

    const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

    const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.qty), 0), [cart]);
    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

    const toggleWishlist = useCallback((product) => {
        setWishlist(prev => {
            if (prev.find(p => p.id === product.id)) {
                return prev.filter(p => p.id !== product.id);
            }
            return [...prev, product];
        });
    }, []);

    const addHistory = useCallback((product) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(p => p.id !== product.id);
            return [product, ...filtered].slice(0, 10);
        });
    }, []);

    const toggleSearch = useCallback(() => setIsSearchOpen(prev => !prev), []);

    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem('siloy_wishlist');
            const savedHistory = localStorage.getItem('siloy_history');
            const savedCart = localStorage.getItem('siloy_cart');
            if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
            if (savedHistory) setRecentlyViewed(JSON.parse(savedHistory));
            if (savedCart) setCart(JSON.parse(savedCart));
        } catch (err) {
            console.error('Failed to load saved data, resetting:', err);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('siloy_wishlist', JSON.stringify(wishlist));
        localStorage.setItem('siloy_history', JSON.stringify(recentlyViewed));
        localStorage.setItem('siloy_cart', JSON.stringify(cart));
    }, [wishlist, recentlyViewed, cart]);

    const value = useMemo(() => ({
        products, isLoading, error,
        cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity,
        isCartOpen, toggleCart, setIsCartOpen,
        wishlist, setWishlist, toggleWishlist,
        recentlyViewed, addHistory,
        isSearchOpen, toggleSearch, setIsSearchOpen,
        isCartPopping
    }), [
        products, isLoading, error,
        cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity,
        isCartOpen, toggleCart, setIsCartOpen,
        wishlist, setWishlist, toggleWishlist,
        recentlyViewed, addHistory,
        isSearchOpen, toggleSearch, setIsSearchOpen,
        isCartPopping
    ]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
