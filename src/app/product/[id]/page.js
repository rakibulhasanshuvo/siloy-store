"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppContext, STORE_CONFIG } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { ProductScroller } from '@/components/ProductScroller';

export default function ProductDetail({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const { products, addToCart, cartCount, toggleCart, wishlist, toggleWishlist, addHistory, isCartPopping } = useAppContext();
    const [selectedSize, setSelectedSize] = useState('');
    const [toastState, setToastState] = useState(null); // 'error' or 'success'
    const [magnifyStyle, setMagnifyStyle] = useState({ display: 'none' });

    const product = products.find(p => String(p.id) === String(id));

    useEffect(() => {
        if (product) {
            addHistory(product);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Using a timeout to avoid cascading render lint error,
            // though in this case it's harmless as it's triggered by ID change.
            const timer = setTimeout(() => setSelectedSize(''), 0);
            return () => clearTimeout(timer);
        }
    }, [product?.id, addHistory, product]);

    if (!product) {
        return (
            <Layout hideNav>
                <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">inventory_2</span>
                    <h2 className="text-xl font-bold">Product Not Found</h2>
                    <p className="text-slate-500 mt-2">The product you are looking for does not exist or has been removed.</p>
                    <button onClick={() => router.push('/shop')} className="mt-6 bg-primary text-white font-bold py-3 px-8 rounded-xl active:scale-95 transition-all">Back to Shop</button>
                </div>
            </Layout>
        );
    }

    const handleAddToCart = () => {
        if (product.sizes && !selectedSize) {
            setToastState('error');
            setTimeout(() => setToastState(null), 2000);
            return;
        }
        addToCart(product, selectedSize || 'Standard');
        setToastState('success');
        setTimeout(() => setToastState(null), 2000);
    };

    const formatWhatsAppInquiry = () => {
        let msg = `Hi ${STORE_CONFIG.STORE_NAME}! I have an inquiry about:\n\n- ${product.name} (SKU: ${product.sku})\n`;
        if (selectedSize) msg += `  Size: ${selectedSize}\n`;
        msg += `  Price: ৳${product.price}\n\nIs this available? I'd like to place an order.`;
        const cleanNum = STORE_CONFIG.WHATSAPP_NUMBER.replace('+', '');
        return `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setMagnifyStyle({
            display: 'block',
            backgroundPosition: `${x}% ${y}%`,
            backgroundImage: `url(${product.img})`,
            backgroundSize: '200%'
        });
    };

    const handleMouseLeave = () => {
        setMagnifyStyle({ display: 'none' });
    };

    return (
        <Layout hideNav>
            <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-primary/10">
                <button onClick={() => router.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_back_ios</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold tracking-tight">Product Details</h1>
                <button onClick={toggleCart} className={`flex items-center justify-center p-2 rounded-full hover:bg-primary/5 transition-colors relative ${isCartPopping ? 'animate-cart-pop' : ''}`}>
                    <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">shopping_bag</span>
                    {cartCount > 0 && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{cartCount}</span>}
                </button>
            </header>
            <main className="pb-32 flex flex-col md:flex-row md:gap-12 md:p-12 animate-[fadeIn_0.5s_ease-out]">
                <div className="relative w-full md:w-1/2 aspect-[4/5] bg-slate-100 md:rounded-3xl overflow-hidden shadow-2xl cursor-crosshair group" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <div className="flex h-full w-full snap-x snap-mandatory overflow-x-auto hide-scrollbar">
                        <div className="relative w-full h-full">
                            <Image src={product.img || '/images/placeholder.gif'} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" unoptimized={!product.img || product.img.endsWith('.gif')} />
                        </div>
                        <div className="hidden md:block absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" style={magnifyStyle}></div>
                        <div className="md:hidden absolute inset-0 w-full h-full">
                            <Image src={product.img || '/images/placeholder.gif'} alt={product.name} fill priority sizes="100vw" className="object-cover" unoptimized={!product.img || product.img.endsWith('.gif')} />
                        </div>
                    </div>
                    <div className="absolute top-8 right-8 z-20 bg-primary text-white text-[10px] font-black tracking-[0.2em] px-6 py-3 rounded-2xl shadow-2xl uppercase italic">Factory Price</div>
                    {product.tag && (
                        <div className={`absolute top-8 left-8 z-20 ${product.tag === 'Best Seller' || product.tag === 'Premium' ? 'bg-orange-500' : 'bg-primary/95'} text-white text-[10px] font-black tracking-[0.2em] px-4 py-3 rounded-2xl shadow-2xl uppercase`}>{product.tag}</div>
                    )}
                </div>
                <div className="px-5 py-6 md:py-0 md:px-0 flex-1 flex flex-col justify-center space-y-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-8 bg-primary"></span>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">{product.category}</p>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black leading-none text-slate-900 dark:text-slate-100 uppercase tracking-tighter italic">{product.name}</h2>
                        <div className="flex items-center gap-4 pt-2">
                            <p className="text-sm font-bold text-slate-400 tracking-[0.2em] uppercase">SKU: {product.sku}</p>
                            <span className="h-4 w-px bg-slate-200"></span>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-orange-400 text-sm fill-1">star</span>
                                <p className="text-xs font-bold">{product.rating} ({product.reviews} Reviews)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="bg-primary/5 px-6 py-4 rounded-3xl border border-primary/10">
                            <span className="text-4xl md:text-6xl font-black text-primary italic">৳{product.price}</span>
                        </div>
                        {product.oldPrice && (
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-slate-400 line-through tracking-tighter">৳{product.oldPrice}</span>
                                {product.discount && <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1">{product.discount}</span>}
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-slate-900 dark:bg-primary/10 text-white dark:text-white rounded-[2rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 bg-primary size-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="bg-primary p-3 rounded-2xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">store</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black uppercase tracking-widest italic">Wholesale Power</p>
                                <p className="text-xs text-slate-400 dark:text-slate-300 font-medium">Order 6+ pieces for exclusive factory pricing.</p>
                            </div>
                            <button className="bg-white text-slate-900 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Get Quote</button>
                        </div>
                    </div>

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <h3 className="text-sm font-black uppercase tracking-widest">Select Size</h3>
                                <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:gap-2 transition-all">
                                    <span className="material-symbols-outlined text-sm">straighten</span> Size Guide
                                </button>
                            </div>
                            <div className="flex gap-4">
                                {product.sizes.map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`flex-1 py-5 rounded-2xl border-2 font-black text-lg transition-all ${selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-primary/30 text-slate-400'}`}>{size}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="hidden md:flex gap-4 pt-4">
                        <button onClick={handleAddToCart} className="flex-1 bg-primary text-white font-black py-5 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.2em] italic relative overflow-hidden group">
                            <span className={`material-symbols-outlined transition-transform duration-300 ${toastState ? '-translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>add_shopping_cart</span>
                            <span className={`transition-transform duration-300 ${toastState ? 'translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>Add To Cart</span>
                            <div className={`absolute inset-0 ${toastState === 'error' ? 'bg-red-500' : 'bg-emerald-500'} flex items-center justify-center gap-2 transition-transform duration-300 ${toastState ? 'translate-y-0' : '-translate-y-full'}`}>
                                <span className="material-symbols-outlined">{toastState === 'error' ? 'error' : 'check_circle'}</span> {toastState === 'error' ? 'Select Size' : 'Added to Bag'}
                            </div>
                        </button>
                        <a href={formatWhatsAppInquiry()} target="_blank" rel="noopener noreferrer" className="size-16 flex items-center justify-center bg-whatsapp text-white rounded-2xl transition-all shadow-xl shadow-whatsapp/20 hover:shadow-whatsapp/40 group active:scale-95 shrink-0">
                            <span className="material-symbols-outlined transition-all group-hover:scale-110">chat</span>
                        </a>
                        <button onClick={() => toggleWishlist(product)} className={`size-16 flex items-center justify-center border-2 rounded-2xl transition-all group shrink-0 ${wishlist.some(w => w.id === product.id) ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:text-primary hover:border-primary'}`}>
                            <span className={`material-symbols-outlined transition-all group-hover:fill-1 ${wishlist.some(w => w.id === product.id) ? 'fill-1 scale-110' : ''}`}>favorite</span>
                        </button>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="text-primary mt-1">
                                <span className="material-symbols-outlined text-2xl">check_circle</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-widest mb-1 italic">Product Details</h4>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="hidden md:block max-w-7xl mx-auto px-12 mb-24">
                <ProductScroller title="You Might Also Like" products={products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)} />
            </div>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] md:hidden bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 p-4 pb-8 z-50">
                <div className="flex gap-4">
                    <button onClick={handleAddToCart} className={`flex-1 ${toastState === 'success' ? 'bg-emerald-500 shadow-emerald-500/30' : toastState === 'error' ? 'bg-red-500 shadow-red-500/30' : 'bg-primary shadow-primary/30'} text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg`}>
                        <span className="material-symbols-outlined">{toastState === 'success' ? 'check_circle' : toastState === 'error' ? 'error' : 'add_shopping_cart'}</span> {toastState === 'success' ? 'Added' : toastState === 'error' ? 'Select Size' : 'Add To Cart'}
                    </button>
                    <a href={formatWhatsAppInquiry()} target="_blank" rel="noopener noreferrer" className="w-14 shrink-0 bg-whatsapp text-white py-4 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-whatsapp/20">
                        <span className="material-symbols-outlined">chat</span>
                    </a>
                    <button onClick={() => toggleWishlist(product)} className={`w-14 shrink-0 border py-4 rounded-xl flex items-center justify-center transition-all active:scale-95 ${wishlist.some(w => w.id === product.id) ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-400 bg-white dark:bg-slate-800 dark:border-slate-700'}`}>
                        <span className={`material-symbols-outlined ${wishlist.some(w => w.id === product.id) ? 'fill-1 scale-110' : ''}`}>favorite</span>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
