import FiltersTest from '@/components/shop/category/filters-test';
import { CategoryByIdProducts } from '@/components/shop/category/Products';
import React, { Suspense } from 'react';

/*const page = ({
  searchParams,
  params,
}: {
  searchParams?: Record<string, string>;
  params: { id?: string };
}) => {
  const category = params?.id || '1';
  return (
    <Suspense fallback={<p> Fetching category products......</p>}>
      <CategoryByIdProducts id={category} />
    </Suspense>
  );
};*/
const page = () => {
  return (
    <>
      <FiltersTest filters={{ color: ['black', 'white'] }} />
    </>
  );
};

export default page;
