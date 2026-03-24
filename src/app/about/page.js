"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Layout } from '@/components/Layout';

export default function About() {
    const router = useRouter();
    return (
        <Layout>
            <header className="sticky top-0 z-50 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md p-4 justify-between border-b border-slate-200 dark:border-slate-800 md:hidden">
                <button onClick={() => router.back()} className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Our Factory Story</h1>
                <button className="flex items-center justify-center rounded-lg h-10 w-10 text-slate-900 dark:text-slate-100">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </header>
            <main className="pb-24">
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 px-4 md:px-8 py-8 md:py-16">
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">Crafting <span className="text-primary not-italic">Elegance</span></h2>
                            <p className="text-sm font-black text-primary uppercase tracking-[0.4em] italic">Established 1998</p>
                        </div>
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Specializing in premium Borkhas and elegant 3-piece suits, our factory combines generations of traditional craftsmanship with modern production technology.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            {[
                                { icon: 'verified', label: '100% Quality Fabric', desc: 'Sourced from the finest mills worldwide.' },
                                { icon: 'precision_manufacturing', label: 'In-house Production', desc: 'End-to-end control over every stitch.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold uppercase tracking-tight italic">{item.label}</h4>
                                        <p className="text-xs text-slate-500 mt-1 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -rotate-3 hidden md:block"></div>
                        <div className="relative aspect-video md:aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl border-8 border-white dark:border-slate-800">
                            <Image className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtPB3a1ni-inmU1U5KVkSvHftmBZOeUm7qJGQvVDH_FK58UQg3wDKNSVp_gBEWvq8OnX4BZaGrdYiUdMbmRrrDmb3AX534ur8XDgx6q8AfNF9MesA1LL1-ezxNwX3qF1O4hfKCvODrdd0Y2axDqJXO7jWdKUUP4G32Q67g544isdrehaIV53kg4gdQqY6rMT6mExFsq_v2h0-d2oJKZdA_DzMLDbLWwTMfPKskIFF7eoZaB8vVj7s1svCXnbkh8V6a9ThJ4ad9Vsc" alt="Factory Story" fill sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                    </div>
                </div>

                <section className="px-4 md:px-8 pb-16">
                    <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
                        <div className="absolute right-0 top-0 bg-primary size-64 rounded-full blur-[120px] opacity-20"></div>
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Wholesale <span className="text-primary not-italic">Solutions</span></h3>
                            <p className="text-slate-400 font-medium md:max-w-xl mx-auto">Are you a boutique owner or retail chain? We offer scalable bulk production with custom labels and premium finishing.</p>
                            <button className="bg-primary text-white font-black py-5 px-12 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-primary/20 hover:shadow-primary/40 mx-auto uppercase tracking-widest italic group">
                                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">mail</span> Start a Partnership
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
