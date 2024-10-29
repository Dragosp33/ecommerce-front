import { Poppins } from 'next/font/google';

import FeatProduct from '@/components/main-page/featured-product';
import { Latest } from '@/components/main-page/latest-products.tsx/latest';
import { Suspense } from 'react';
import Loading from './loading';
import { Best } from '@/components/main-page/best-sellers/best';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default async function Home() {
  //throw Error('errrrrr');
  return (
    <div className='w-full'>
      <FeatProduct />
      <Suspense fallback={<Loading />}>
        <Latest limit={5} showShop={true} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Best limit={5} />
      </Suspense>
    </div>
  );
}
