"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

export const BottomNav = () => {
    const pathname = usePathname();
    const { toggleCart, cartCount, wishlist } = useAppContext();
    const wishlistCount = wishlist.length;

    const navItems = [
        { path: '/', label: 'Home', icon: 'home' },
        { path: '/shop', label: 'Shop', icon: 'storefront' },
        { isAction: true, action: toggleCart, label: 'Cart', icon: 'shopping_bag', badge: cartCount },
        { path: '/wishlist', label: 'Saved', icon: 'favorite', badge: wishlistCount },
        { path: '/contact', label: 'Contact', icon: 'call' },
    ];

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] md:hidden bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
            {navItems.map((item, idx) => {
                const isActive = pathname === item.path;

                if (item.isAction) {
                    return (
                        <button key={idx} onClick={item.action} className={`flex flex-col items-center gap-1 text-slate-400 hover:text-primary relative`}>
                            <span className={`material-symbols-outlined ${cartCount > 0 ? 'fill-1 text-primary' : ''}`}>{item.icon}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                            {item.badge > 0 && (
                                <span className="absolute -top-1 -right-2 h-3 w-3 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold">{item.badge}</span>
                            )}
                        </button>
                    );
                }

                return (
                    <Link key={idx} href={item.path} className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                        <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        {item.badge > 0 && (
                            <span className="absolute -top-1 -right-2 h-3 w-3 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold">{item.badge}</span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};
