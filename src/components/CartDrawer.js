"use client";

import React from 'react';
import { useAppContext, STORE_CONFIG } from '@/context/AppContext';

export const CartDrawer = () => {
    const { isCartOpen, toggleCart, cart, cartTotal, updateQuantity, removeFromCart } = useAppContext();

    if (!isCartOpen) return null;

    const formatWhatsAppOrder = () => {
        let msg = `Hi ${STORE_CONFIG.STORE_NAME}! I would like to order:\n\n`;
        cart.forEach(item => {
            msg += `- ${item.name} (SKU: ${item.sku})\n  Size: ${item.size} | Qty: ${item.qty} | ৳${item.price * item.qty}\n`;
        });
        msg += `\n*Total: ৳${cartTotal}*\n\nPlease confirm availability.`;
        const cleanNum = STORE_CONFIG.WHATSAPP_NUMBER.replace('+', '');
        return `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer" onClick={toggleCart}></div>
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl animate-spring-drawer">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase tracking-tighter italic">Your <span className="text-primary not-italic">Bag</span></h2>
                    <button onClick={toggleCart} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <span className="material-symbols-outlined text-6xl opacity-20">shopping_bag</span>
                            <p className="font-medium text-sm">Your bag is empty.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                                <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Size: {item.size}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg px-2 py-1">
                                            <button onClick={() => updateQuantity(item.id, item.size, -1)} className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[16px]">remove</span></button>
                                            <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                                            <button onClick={() => updateQuantity(item.id, item.size, 1)} className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[16px]">add</span></button>
                                        </div>
                                        <p className="font-black text-primary">৳{item.price * item.qty}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id, item.size)} className="p-2 text-slate-400 hover:text-red-500 self-start">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-4">
                        <div className="flex items-center justify-between text-sm font-bold">
                            <span>Subtotal</span>
                            <span>৳{cartTotal}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span>Delivery</span>
                            <span>Calculated on WhatsApp</span>
                        </div>
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between text-xl font-black">
                            <span>Total</span>
                            <span className="text-primary italic">৳{cartTotal}</span>
                        </div>
                        <a href={formatWhatsAppOrder()} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-all active:scale-95 uppercase tracking-widest text-sm mt-4">
                            <span className="material-symbols-outlined">chat</span> Order on WhatsApp
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
