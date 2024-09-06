'use client';

import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

const page = () => {
  async function getSession() {
    const session = await fetch('');
  }
  return (
    <form action='/api/checkout_sessions' method='POST'>
      <section>
        <Button type='submit' role='link' variant={'link'}>
          Checkout
        </Button>
      </section>
    </form>
  );
};

export default page;
