'use client';

import { CartContext } from '@/hooks/cart-provider';
import { CartProduct } from '@/lib/types';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { usePathname, useSearchParams } from 'next/navigation';
import { isFullfilledOrder } from '@/lib/stripe';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn, generateVariantUrl } from '@/lib/utils';
import Link from 'next/link';
import { TiDeleteOutline } from 'react-icons/ti';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { BackButton } from '../auth/back-button';
import Social from '../auth/social';
import { FormSuccess } from '../form-success';
import BeatLoader from 'react-spinners/BeatLoader';
import { Poppins } from 'next/font/google';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

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
  const k = products.map((product) => {
    return { productId: product.productId, SKU: product.SKU };
  });

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
      }),
    });

    const res = await response.json();
    if (res.error) {
      console.log('ERRRRRRRRRRPR', res.error);
    }
    const { id, url } = res;

    if (url) {
      // Redirect to the Stripe Checkout page
      localStorage.setItem('cart_sess', id);
      window.location.href = url;
    } else {
      console.error('Failed to create a checkout session');
    }
  }
  if (isLoading) {
    return <BeatLoader />;
  }

  if (success) {
    return (
      <Card className='w-[400px] shadow-md'>
        <CardHeader>
          <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
            <h1 className={cn('text-3xl font-semibold', font.className)}>
              Thank you for your purchase{' '}
            </h1>
            <p className='text-muted-foreground text-sm'>
              Your data has been saved.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center w-full justify-center'>
            <FormSuccess message={`Order completed`} />
          </div>
        </CardContent>
        <CardFooter>
          <BackButton href={'/shop'} label={'Continue shopping'} />
        </CardFooter>
      </Card>
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
    <div className='mx-2'>
      <div>
        {products.map((product) => (
          <div
            className='flex justify-between space-x-4 mb-2 text-xs border-b-2'
            //className='grid col'
            key={product.SKU}
          >
            <div className='flex flex-row'>
              <Avatar className='self-center w-32 h-32 rounded-full'>
                <AvatarImage
                  src={product.thumbnail}
                  className='object-contain'
                  width={200}
                  height={200}
                />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={generateVariantUrl(product)}
                  className='text-sm sm:text-lg'
                >
                  {' '}
                  {product.title}{' '}
                </Link>
              </div>
            </div>
            <div className='flex flex-col justify-between'>
              {product.price} x {product.quantity}
              <Button
                onClick={() => {
                  context?.removeWholeQuantity(product.SKU);
                }}
                size='sm'
                className='text-sm border-0 mt-2'
                variant='outline'
              >
                <TiDeleteOutline className='w-4 h-4 p-0' />
              </Button>
            </div>
          </div>
        ))}
        {/* Display total price if there are products */}
        <div className='flex justify-between space-x-4 text-xs mt-2'>
          <p>Total:</p>
          <p>{context?.totalPrice}</p>
        </div>
      </div>

      <Button onClick={createCheckoutSession}> Go to checkout </Button>
    </div>
  );
};
