function formatWhatsAppOrderUrl(cart, cartTotal, STORE_CONFIG) {
    let msg = `Hi ${STORE_CONFIG.STORE_NAME}! I would like to order:\n\n`;
    cart.forEach(item => {
        msg += `- ${item.name} (SKU: ${item.sku})\n  Size: ${item.size} | Qty: ${item.qty} | ৳${item.price * item.qty}\n`;
    });
    msg += `\n*Total: ৳${cartTotal}*\n\nPlease confirm availability.`;
    const cleanNum = (STORE_CONFIG.WHATSAPP_NUMBER || "").replace('+', '');
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatWhatsAppOrderUrl };
}
