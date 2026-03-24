"use client";

import React, { useState, useEffect } from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';

export const Layout = ({ children, hideNav = false }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setShowScrollTop(window.scrollY > 400);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-background-dark overflow-x-hidden selection:bg-primary/20">
            {!hideNav && <TopNav />}
            <div className="relative flex flex-col w-full min-h-[inherit]">
                {/* Mobile: card with shadow | Desktop: clean full-width background */}
                <div className="flex-1 w-full max-w-[430px] md:max-w-none mx-auto bg-white dark:bg-background-dark shadow-2xl md:shadow-none md:rounded-none overflow-hidden animate-[fadeIn_0.4s_ease-out]">
                    <div className="md:max-w-7xl md:mx-auto">
                        {children}
                    </div>
                </div>
                {!hideNav && <BottomNav />}
            </div>
            <CartDrawer />
            <SearchOverlay />
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`scroll-top-btn bg-primary text-white p-3 rounded-2xl shadow-2xl ${showScrollTop ? 'visible' : ''}`}>
                <span className="material-symbols-outlined">arrow_upward</span>
            </button>
        </div>
    );
};
