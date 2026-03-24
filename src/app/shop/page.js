"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { ProductScroller } from '@/components/ProductScroller';

export default function Shop() {
    const router = useRouter();
    const { products, toggleCart, cartCount, toggleSearch, toggleWishlist, wishlist, recentlyViewed, isLoading } = useAppContext();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('popularity');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef(null);

    const sortOptions = [
        { value: 'popularity', label: 'Popularity', icon: 'trending_up' },
        { value: 'price_low', label: 'Price: Low → High', icon: 'arrow_upward' },
        { value: 'price_high', label: 'Price: High → Low', icon: 'arrow_downward' },
        { value: 'newest', label: 'Newest First', icon: 'schedule' },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    return (
        <Layout>
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => router.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_back_ios</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Full Collection</h1>
                    <button onClick={toggleCart} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                        <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">shopping_bag</span>
                        {cartCount > 0 && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animate-pulse">{cartCount}</span>}
                    </button>
                </div>
                <div className="px-4 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1" onClick={toggleSearch}>
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="Search Borkhas, 3-piece suits..." type="text" />
                        </div>
                        <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">tune</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto px-4 pb-3 hide-scrollbar">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)} className={`flex h-9 items-center whitespace-nowrap rounded-full px-4 text-sm font-medium capitalize ${filter === cat ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>{cat}</button>
                    ))}
                </div>
            </header>
            <main className="flex-1 px-4 md:px-8 py-4 pb-24">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter italic md:block hidden">Full <span className="text-primary not-italic">Collection</span></h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest md:mt-1">Showing {displayProducts.length} Premium Items</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex gap-2 mr-4">
                            {categories.slice(1).map(cat => (
                                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all capitalize ${filter === cat ? 'border-primary text-primary bg-primary/5' : 'border-slate-200 text-slate-400 hover:border-primary'}`}>{cat}</button>
                            ))}
                        </div>
                        <div ref={sortRef} className="relative">
                            <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="text-sm font-bold uppercase tracking-wider">{(sortOptions.find(o => o.value === sortBy) || {}).label || 'Sort'}</span>
                                <span className={`material-symbols-outlined text-sm transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            {isSortOpen && (
                                <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-[slideInUp_0.2s_ease-out]">
                                    {sortOptions.map(option => (
                                        <button key={option.value} onClick={() => { setSortBy(option.value); setIsSortOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${sortBy === option.value ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <span className="material-symbols-outlined text-lg">{option.icon}</span>
                                            {option.label}
                                            {sortBy === option.value && <span className="material-symbols-outlined text-primary ml-auto text-sm">check</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {isLoading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col animate-pulse pt-2 md:pt-4">
                                <div className="aspect-[3/4] rounded-2xl md:rounded-3xl mb-3 bg-slate-200 dark:bg-slate-800"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
                                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mx-auto"></div>
                            </div>
                        ))
                    ) : (
                        displayProducts.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-slate-500 font-medium bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                                No products found matching your search or filter.
                            </div>
                        ) : (
                            displayProducts.map((p) => (
                                <div key={p.id} className="group flex flex-col pt-2 md:pt-4">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-slate-100 dark:bg-slate-800 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                                        <Image src={p.img || '/images/placeholder.gif'} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized={!p.img || p.img.endsWith('.gif')} />
                                        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }} className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl backdrop-blur shadow-sm transition-all md:scale-0 md:group-hover:scale-100 ${wishlist.some(w => w.id === p.id) ? 'bg-primary text-white scale-100' : 'bg-white/80 text-primary hover:bg-primary hover:text-white'}`}>
                                            <span className={`material-symbols-outlined text-xl italic ${wishlist.some(w => w.id === p.id) ? 'fill-1' : ''}`}>favorite</span>
                                        </button>
                                        {p.tag && <div className={`absolute bottom-4 left-4 rounded-xl ${p.tag === 'Best Seller' || p.tag === 'Premium' ? 'bg-orange-500' : 'bg-primary/95'} px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest shadow-lg`}>{p.tag}</div>}
                                    </div>
                                    <div className="mt-5 px-1 flex flex-col items-center text-center cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                                        <h3 className="line-clamp-1 text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">{p.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-xl font-black text-primary italic">৳{p.price}</p>
                                            {p.oldPrice && <p className="text-sm font-bold text-slate-400 line-through">৳{p.oldPrice}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                </div>

                <ProductScroller title="Recently Viewed" products={recentlyViewed} />
            </main>
        </Layout>
    );
}
