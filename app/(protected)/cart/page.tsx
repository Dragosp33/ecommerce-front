import { CartProducts } from '@/components/cart/cart-items';
import { UserInfoCard } from '@/components/cart/userinfos';
import { CartUserSkeleton } from '@/components/skeletons/cart-user-info';
import { Button } from '@/components/ui/button';

import { CartProduct } from '@/lib/types';
import { Metadata } from 'next';

import { Suspense } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const metadata: Metadata = {
  title: 'Cart',
};

const Page = () => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-[70%_30%] relative'>
      <div>
        <CartProducts />
      </div>

      <div className='md:sticky md:top-8 md:self-start'>
        <Suspense fallback={<CartUserSkeleton />}>
          <UserInfoCard />
        </Suspense>
      </div>
    </div>
  );
  /*return (
    <form action='/api/checkout_sessions' method='POST'>
      <section>
        <Button type='submit' role='link' variant={'link'}>
          Checkout
        </Button>
        <Button type='button' onClick={getItems}></Button>
      </section>
    </form>
  );*/
};

export default Page;
