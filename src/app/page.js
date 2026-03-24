"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Layout } from '@/components/Layout';

export default function Home() {
    const router = useRouter();
    const { products, toggleSearch, isLoading } = useAppContext();

    return (
        <Layout>
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 md:px-8 pt-4 pb-2 border-b border-primary/10 md:hidden">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-white p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-2xl">factory</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase italic">Siloy</h1>
                    </div>
                    <button onClick={() => router.push('/contact')} className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/10 text-green-600">
                        <span className="material-symbols-outlined text-2xl">chat</span>
                    </button>
                </div>
                <div className="relative" onClick={toggleSearch}>
                    <div className="flex items-center w-full h-11 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 gap-3 cursor-text">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                        <span className="text-sm text-slate-400">Search Premium Borkhas & 3-Pieces</span>
                    </div>
                </div>
            </header>
            <main className="flex-1 pb-24">
                <section className="px-4 md:px-8 py-4">
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[21/9] group cursor-pointer shadow-xl" onClick={() => router.push('/shop')}>
                        <img alt="Hero" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="/hero.png" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-16">
                            <div className="md:max-w-3xl space-y-4 md:space-y-6">
                                <div className="flex items-center gap-2">
                                    <span className="h-px w-8 bg-primary"></span>
                                    <p className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.4em] italic">Direct from Dhaka</p>
                                </div>
                                <h2 className="text-white text-3xl md:text-7xl font-black leading-none uppercase tracking-tighter italic">Premium Borkhas <br className="hidden md:block" />& 3-Piece <span className="text-primary not-italic">Suits</span></h2>
                                <p className="text-slate-300 text-sm md:text-lg font-medium md:max-w-xl leading-relaxed hidden md:block">Experience the finest craftsmanship in every stitch. We deliver high-quality fashion directly from our state-of-the-art factory floor to your doorstep.</p>
                                <button className="bg-primary text-white font-black py-4 px-10 rounded-2xl w-fit active:scale-95 transition-all shadow-2xl shadow-primary/40 uppercase tracking-widest italic flex items-center gap-3 group">
                                    Explore Collection <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-6">
                    <div className="px-4 mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold">Categories</h3>
                        <Link href="/shop" className="text-primary text-sm font-semibold">View All</Link>
                    </div>
                    <div className="flex gap-6 overflow-x-auto px-4 hide-scrollbar">
                        {[
                            { icon: 'woman', label: 'Borkhas' },
                            { icon: 'checkroom', label: '3-Pieces' },
                            { icon: 'styler', label: 'Hijabs' },
                            { icon: 'diamond', label: 'Luxury' }
                        ].map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer" onClick={() => router.push('/shop')}>
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                                </div>
                                <span className="text-xs font-medium text-center">{cat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black uppercase tracking-tighter italic">New <span className="text-primary">Arrivals</span></h3>
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full">LATEST DROP</span>
                            <button className="hidden md:flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                                VIEW ALL <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {isLoading ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="flex flex-col animate-pulse">
                                    <div className="aspect-[3/4] rounded-2xl md:rounded-3xl mb-3 bg-slate-200 dark:bg-slate-800"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                                </div>
                            ))
                        ) : (
                            products.slice(0, 4).map((p) => (
                                <div key={p.id} className="flex flex-col group cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                                    <div className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden mb-3 bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                        {p.tag && <div className={`absolute top-4 left-4 z-10 rounded-xl ${p.tag === 'Best Seller' || p.tag === 'Premium' ? 'bg-orange-500' : 'bg-primary/95'} px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest shadow-lg`}>{p.tag}</div>}
                                        <img alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={p.img} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                                        <button className="absolute bottom-4 right-4 w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-primary hover:text-white">
                                            <span className="material-symbols-outlined text-2xl">add_shopping_cart</span>
                                        </button>
                                    </div>
                                    <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate px-1">{p.name}</h4>
                                    <div className="flex items-center gap-2 px-1">
                                        <p className="text-primary font-black text-lg">৳{p.price}</p>
                                        {p.oldPrice && <p className="text-slate-400 text-xs font-medium line-through">৳{p.oldPrice}</p>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
                <section className="mt-8 px-4 md:px-8 mb-12">
                    <div className="bg-primary/5 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="flex-1 flex flex-col gap-6 w-full">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                                    <span className="material-symbols-outlined text-3xl">verified</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-xl text-slate-900 dark:text-white uppercase tracking-tighter italic">Own Factory <span className="text-primary not-italic">Guarantee</span></h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">Premium quality control direct from production lines. No middlemen.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                                    <span className="material-symbols-outlined text-3xl">local_shipping</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-xl text-slate-900 dark:text-white uppercase tracking-tighter italic">Nationwide <span className="text-primary not-italic">Delivery</span></h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">Fast and secure shipping across the entire country with live tracking.</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-px md:h-48 bg-primary/10 w-full h-px hidden md:block"></div>
                        <div className="flex-1 w-full text-center md:text-left">
                            <h5 className="text-3xl font-black mb-4 leading-tight italic uppercase tracking-tighter">Ready to <span className="text-primary">Upgrade?</span></h5>
                            <p className="text-slate-500 mb-8 font-medium">Join 50k+ satisfied customers wearing Siloy.</p>
                            <button className="w-full md:w-fit bg-primary text-white font-bold py-4 px-12 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95" onClick={() => router.push('/shop')}>SHOP NOW</button>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
