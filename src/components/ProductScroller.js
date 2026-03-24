"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const ProductScroller = ({ title, products }) => {
    const router = useRouter();
    const scrollerRef = useRef(null);

    if (!products || products.length === 0) return null;

    const scroll = (direction) => {
        if (scrollerRef.current) {
            const scrollAmount = 300;
            scrollerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mt-12 md:mt-16 w-full">
            <div className="flex items-center justify-between mb-6 px-4 md:px-0">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">{title}</h3>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-primary text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">arrow_back</span></button>
                    <button onClick={() => scroll('right')} className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-primary text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                </div>
            </div>
            <div ref={scrollerRef} className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-0 snap-x pb-4">
                {products.map(p => (
                    <div key={p.id} onClick={() => router.push(`/product/${p.id}`)} className="group cursor-pointer snap-start shrink-0 w-[160px] md:w-[220px]">
                        <div className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 relative">
                            <Image src={p.img || '/images/placeholder.gif'} alt={p.name} fill sizes="(max-width: 768px) 160px, 220px" className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized={!p.img || p.img.endsWith('.gif')} />
                        </div>
                        <h4 className="text-sm font-bold line-clamp-1 dark:text-white px-1">{p.name}</h4>
                        <p className="text-primary font-black px-1">৳{p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
