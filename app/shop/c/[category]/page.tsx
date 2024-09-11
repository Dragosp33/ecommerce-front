import Filters from '@/components/shop/category/filters';
import { CategoryProducts } from '@/components/shop/category/Products';
import { ProductsSkeleton } from '@/components/shop/category/products-grid-skeleton';
import React, { Suspense } from 'react';

async function page({
  params,
  searchParams,
}: {
  params: { category?: string };
  searchParams: Record<string, string[]>;
}) {
  //const encoded = params?.category || '1';
  // const category = decodeURIComponent(encoded)
  const category = params?.category || '1';
  console.log(decodeURIComponent(category));

  console.log('SERVER RENDER', searchParams);
  return (
    <>
      <Suspense fallback={<ProductsSkeleton />}>
        <CategoryProducts name={category} params={searchParams} />
      </Suspense>
    </>
  );
}

export default page;
