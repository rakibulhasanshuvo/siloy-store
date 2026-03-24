"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

export const SearchOverlay = () => {
    const { isSearchOpen, toggleSearch, products } = useAppContext();
    const [query, setQuery] = useState('');
    const router = useRouter();
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isSearchOpen) toggleSearch();
        };
        window.addEventListener('keydown', handleKeyDown);

        if (isSearchOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, toggleSearch]);

    if (!isSearchOpen) return null;

    const results = query ? products.filter(p => p?.name?.toLowerCase().includes(query.toLowerCase()) || p?.category?.toLowerCase().includes(query.toLowerCase())) : [];

    return (
        <div className="fixed inset-0 z-[120] flex flex-col bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between p-4 md:p-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex-1 max-w-3xl mx-auto flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl text-slate-400">search</span>
                    <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for borkhas, 3-pieces, styles..." className="w-full bg-transparent text-2xl md:text-4xl font-black outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 text-slate-900 dark:text-white" />
                </div>
                <button onClick={toggleSearch} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-4 shrink-0">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto max-w-5xl w-full mx-auto p-4 md:p-8">
                {!query && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Trending Searches</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Dubai Cherry', 'Bridal', 'Linen', 'Black Abaya', 'Sale'].map(term => (
                                    <button key={term} onClick={() => setQuery(term)} className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 font-bold text-sm hover:border-primary transition-all active:scale-95">{term}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {query && results.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                        <span className="material-symbols-outlined text-5xl mb-3 opacity-30">search_off</span>
                        <p className="font-bold">No results found for "{query}"</p>
                    </div>
                )}

                {results.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-[slideInUp_0.3s_ease-out]">
                        {results.map(p => (
                            <div key={p.id} onClick={() => { toggleSearch(); router.push(`/product/${p.id}`); }} className="group cursor-pointer">
                                <div className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 relative">
                                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <h4 className="text-sm font-bold line-clamp-1">{p.name}</h4>
                                <p className="text-primary font-black">৳{p.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
