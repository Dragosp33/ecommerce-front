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
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/category-filter/${category}` ||
    `http://admin.shop.localhost:3001/api/category-filter/${category}`;
  const res = await fetch(url, {
    method: 'GET',
    next: { revalidate: 10 },
  });
  const filters = await res.json();
  console.log('FILTERS:::: ', filters, filters.properties);

  return (
    <>
      {filters.properties && <Filters filters={filters.properties} />}
      {children}
    </>
  );
}
