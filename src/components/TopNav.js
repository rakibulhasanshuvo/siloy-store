"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

export const TopNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { cartCount, toggleCart, toggleSearch, wishlist, isCartPopping } = useAppContext();
    const wishlistCount = wishlist.length;

    const navLeft = [
        { path: '/shop', label: 'Collection' },
        { path: '/about', label: 'Our Story' },
    ];

    const navRight = [
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="hidden md:block sticky top-0 z-50 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-8 py-5 grid grid-cols-[1fr_auto_1fr] items-center gap-8">
                {/* Left Menu */}
                <div className="flex items-center gap-10">
                    {navLeft.map((item) => (
                        <Link key={item.path} href={item.path} className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:text-primary ${pathname === item.path ? 'text-primary' : 'text-slate-500'}`}>
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Center Logo */}
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/')}>
                    <div className="bg-primary text-white p-2.5 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform">
                        <span className="material-symbols-outlined text-2xl italic">factory</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">Siloy <span className="text-primary not-italic">Garments</span></h1>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end gap-6">
                    <div className="hidden lg:flex items-center gap-8">
                        {navRight.map((item) => (
                            <Link key={item.path} href={item.path} className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:text-primary ${pathname === item.path ? 'text-primary' : 'text-slate-500'}`}>
                                {item.label}
                            </Link>
                        ))}
                        <Link href="/wishlist" className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:text-primary relative ${pathname === '/wishlist' ? 'text-primary' : 'text-slate-500'}`}>
                            Wishlist
                            {wishlistCount > 0 && <span className="absolute -top-3 -right-3 h-4 w-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold">{wishlistCount}</span>}
                        </Link>
                    </div>
                    <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>
                    <div className="flex items-center gap-3">
                        <button onClick={toggleSearch} className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-[22px]">search</span>
                        </button>
                        <button onClick={toggleCart} className={`w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative ${isCartPopping ? 'animate-cart-pop' : ''}`}>
                            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                            {cartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 h-4 w-4 bg-primary text-white text-[9px] flex items-center justify-center rounded-full font-black">{cartCount}</span>
                            )}
                        </button>
                    </div>
                    <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-[10px] font-black px-6 py-3.5 rounded-2xl hover:bg-primary transition-all active:scale-95 uppercase tracking-widest italic" onClick={() => router.push('/shop')}>
                        Shop Collection
                    </button>
                </div>
            </div>
        </nav>
    );
};
