import { CartProducts } from '@/components/cart/cart-items';
import { UserInfoCard } from '@/components/cart/userinfos';
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
    <div>
      <CartProducts />
      <Suspense fallback={<p> loading userinfo from stripe...</p>}>
        <UserInfoCard />
      </Suspense>
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
