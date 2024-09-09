'use client';

import Filters from '@/components/shop/category/filters';

export default async function layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { category: string };
}>) {
  console.log('LAYOUT CALLED');
  const category = params.category || '1';
  const res = await fetch(
    `http://admin.shop.localhost:3001/api/category-filter/${category}`,
    {
      method: 'GET',
      next: { revalidate: 10 },
    }
  );
  const filters = await res.json();
  console.log('FILTERS:::: ', filters, filters.properties);
  return (
    <>
      <Filters filters={filters.properties} />
      {children}
    </>
  );
}
