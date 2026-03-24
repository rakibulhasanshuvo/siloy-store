"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Layout } from '@/components/Layout';

export default function Wishlist() {
    const router = useRouter();
    const { wishlist, toggleWishlist } = useAppContext();

    return (
        <Layout>
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => router.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_back_ios</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Saved Items</h1>
                    <div className="w-10"></div>
                </div>
            </header>
            <main className="flex-1 px-4 md:px-8 py-8 md:py-16 pb-24 min-h-[70vh]">
                <div className="mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-center md:text-left">Your <span className="text-primary not-italic">Wishlist</span></h2>
                    {wishlist.length > 0 && <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 text-center md:text-left">{wishlist.length} Items Saved</p>}
                </div>

                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 md:h-64 text-center">
                        <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-700 mb-4">favorite_border</span>
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Nothing saved yet</h3>
                        <p className="text-slate-500 font-medium mb-6">Tap the heart on any item to save it here for later.</p>
                        <button onClick={() => router.push('/shop')} className="bg-primary text-white font-bold py-3 px-8 rounded-xl active:scale-95 transition-all shadow-lg shadow-primary/20">Explore Collection</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12 animate-[fadeIn_0.5s_ease-out]">
                        {wishlist.map(p => (
                            <div key={p.id} className="group flex flex-col pt-2 md:pt-4">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                                    <img alt={p.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" src={p.img} />
                                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary shadow-lg hover:bg-slate-100 transition-all scale-100 md:scale-0 md:group-hover:scale-100">
                                        <span className="material-symbols-outlined text-xl italic fill-1">favorite</span>
                                    </button>
                                </div>
                                <div className="mt-5 px-1 flex flex-col items-center text-center cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                                    <h3 className="line-clamp-1 text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">{p.name}</h3>
                                    <p className="text-xl font-black text-primary italic mt-1">৳{p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </Layout>
    );
}
