"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Layout } from '@/components/Layout';
import { STORE_CONFIG } from '@/context/AppContext';

export default function Contact() {
    const router = useRouter();
    const [localError, setLocalError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        interest: 'Borkhas & Abayas',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.message || !formData.phone) {
            setLocalError('Please fill in name, phone, and message.');
            setTimeout(() => setLocalError(''), 3000);
            return;
        }
        const msg = `Hi ${STORE_CONFIG.STORE_NAME}! I have a quick inquiry:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Interested In:* ${formData.interest}\n*Message:* ${formData.message}`;
        const cleanNum = STORE_CONFIG.WHATSAPP_NUMBER.replace('+', '');
        window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <Layout>
            <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-primary/10 md:hidden">
                <button onClick={() => router.back()} className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight flex-1 text-center pr-10">Visit Our Store</h1>
            </header>
            <main className="flex-1 pb-24 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    <div className="flex-1 space-y-12">
                        <section className="px-4 md:px-0">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none mb-8">Get in <span className="text-primary not-italic">Touch</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a className="flex items-center gap-6 rounded-[2rem] border-2 border-slate-100 bg-white dark:bg-slate-900 p-6 transition-all hover:border-primary/30 group" href={`tel:+${STORE_CONFIG.WHATSAPP_NUMBER}`}>
                                    <div className="bg-primary/10 text-primary w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors rotate-3 group-hover:rotate-0"><span className="material-symbols-outlined text-3xl">call</span></div>
                                    <div><h3 className="font-black uppercase tracking-tight italic">Call Us</h3><p className="text-slate-500 font-bold">+{STORE_CONFIG.WHATSAPP_NUMBER}</p></div>
                                </a>
                                <a className="flex items-center gap-6 rounded-[2rem] border-2 border-slate-100 bg-white dark:bg-slate-900 p-6 transition-all hover:border-primary/30 group" href={`https://wa.me/${STORE_CONFIG.WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                                    <div className="bg-whatsapp/10 text-whatsapp w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-whatsapp group-hover:text-white transition-colors -rotate-3 group-hover:rotate-0"><span className="material-symbols-outlined text-3xl">chat</span></div>
                                    <div><h3 className="font-black uppercase tracking-tight italic">WhatsApp</h3><p className="text-slate-500 font-bold">Chat Now</p></div>
                                </a>
                            </div>
                        </section>

                        <section className="px-4 md:px-0">
                            <div className="flex justify-between items-end mb-6">
                                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Our <span className="text-primary not-italic">Location</span></h2>
                                <span className="text-emerald-500 text-xs font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full">Open Now</span>
                            </div>
                            <div className="rounded-3xl overflow-hidden border-2 border-slate-100 bg-white dark:bg-slate-900 shadow-xl">
                                <div className="relative h-64 w-full bg-slate-200">
                                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk4nYES556sK-Ro1TNLaPTfttjTYd8Kom3Tidj1uXNIeVc5EV35Q2EcJkq7iaEurY3eJccVI1JRmor3NM89asuRrjMme1Z39zmjxMfJhItWYOZEAnG_oySoSJellIef9MpPO0EkGOQm4ppnR9gRrTJ6DMHrGT37qpJ1ewZRVnw3bxuGWeWJnX1oJ4W_NJquN-kguYk5dfV-YHoGB47TexFbisPF_hNstUkh1jmRwKOEiMc_grgQ8u173rc9_SjCL2jaVvB2K5vDiw" alt="Map" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center"><div className="bg-primary text-white p-4 rounded-2xl shadow-2xl ring-8 ring-white/20"><span className="material-symbols-outlined text-2xl">location_on</span></div></div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-black text-xl uppercase tracking-tight italic mb-1">Suits & Borkha Factory Showroom</h3>
                                    <p className="text-slate-500 font-medium">Noyagon, kamragirchar, Dhaka</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="px-4 md:px-0 flex-1">
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border-2 border-slate-100 shadow-2xl sticky top-32">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="h-px w-8 bg-primary"></span>
                                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Quick <span className="text-primary">Inquiry</span></h2>
                            </div>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {localError && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-[fadeIn_0.3s_ease-out]">{localError}</div>}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 px-3">Full Name</label>
                                    <input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-2xl border-none bg-slate-50 dark:bg-slate-800 py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Enter your name"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 px-3">Phone Number</label>
                                    <input
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full rounded-2xl border-none bg-slate-50 dark:bg-slate-800 py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Enter your phone number"
                                        type="tel"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 px-3">Interested In</label>
                                    <select
                                        value={formData.interest}
                                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                        className="w-full rounded-2xl border-none bg-slate-50 dark:bg-slate-800 py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none transition-all"
                                    >
                                        <option>Borkhas & Abayas</option>
                                        <option>3-Piece Suits</option>
                                        <option>Wholesale Partnership</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 px-3">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full rounded-2xl border-none bg-slate-50 dark:bg-slate-800 py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 min-h-[120px] transition-all"
                                        placeholder="Tell us what you're looking for..."
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 uppercase tracking-widest italic">
                                    <span className="material-symbols-outlined">send</span> Send Message
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
