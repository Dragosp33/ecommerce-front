'use server';

import { CartProduct } from '@/lib/types';

export function buildLineItems(items: CartProduct[]) {
  return items.map((item: CartProduct) => ({
    price_data: {
      currency: 'usd', // Change to your currency
      product_data: {
        name: item.title, // Product name
        images: [item.thumbnail], // Product image URL (optional)
        metadata: { SKU: item.SKU },
      },

      unit_amount: Number(item.price) * 100, // Stripe expects amount in cents
    },
    //metadata: { SKU: item.SKU },
    quantity: item.quantity,
  }));
}
