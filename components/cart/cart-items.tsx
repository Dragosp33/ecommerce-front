'use client';

import { CartContext } from '@/hooks/cart-provider';
import { CartProduct } from '@/lib/types';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { usePathname, useSearchParams } from 'next/navigation';
import { isFullfilledOrder } from '@/lib/stripe';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export const CartProducts = () => {
  const context = useContext(CartContext);

  const products = context?.cartProducts || [];
  const path = usePathname();
  const params = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log('CART PRODUCTS RERENDER');
  useEffect(() => {
    async function k() {
      if (params.get('success') === 'true' && params.get('session_id')) {
        const sessionId = params.get('session_id') || '';
        const orderStatus = await isFullfilledOrder(sessionId);

        // If the order is complete, set success state to true
        if (orderStatus === 'complete') {
          setSuccess(true);
          // localStorage.set('cart', '');
          context?.clearCart();
        }
      }
      setIsLoading(false);
    }

    k();
  }, [params]);

  async function createCheckoutSession() {
    const items = products;

    // Adjust your endpoint according to your actual route
    const response = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        // You can pass customer details if needed
        // customer: { id: 'customer_id' }
      }),
    });

    const { id, url } = await response.json();

    if (url) {
      // Redirect to the Stripe Checkout page
      localStorage.setItem('cart_sess', id);
      window.location.href = url;
    } else {
      console.error('Failed to create a checkout session');
    }
  }
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (success) {
    return (
      <div>
        <h2> Thank you for your purchase</h2>
        <p> Continue shopping </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div>
        Your cart is empty for now.
        <p> Come back when you find something you like </p>
      </div>
    );
  }
  return (
    <div>
      {products.map((product: CartProduct) => (
        <div key={product.SKU}>
          {product.title}
          {product.quantity}
        </div>
      ))}

      <Button onClick={createCheckoutSession}> Go to checkout </Button>
    </div>
  );
};
