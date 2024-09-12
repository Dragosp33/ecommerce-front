'use server';

import { Latest } from '@/components/main-page/latest-products.tsx/latest';
import { Suspense } from 'react';
import { Best } from '@/components/main-page/best-sellers/best';

export default async function Page() {
  return (
    <div>
      <Suspense>
        <Latest limit={10} showShop={false} />
      </Suspense>
      <Best limit={10} />
    </div>
  );
}
