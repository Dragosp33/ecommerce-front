//'use client';

import Filters from '@/components/shop/category/filters';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import React from 'react';

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
  let breadCrumbs = [];
  if (filters.path) {
    breadCrumbs = filters.path.replace(/^,|,$/g, '').split(',');
  }
  // const

  return (
    <div className='w-full bg-secondary'>
      <div className='max-w-screen-2xl md:container md:px-10 sm:px-5 px-2 mx-auto'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={'/shop'}>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {breadCrumbs.map((breadCrumb: string) => (
              <React.Fragment key={breadCrumb}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/shop/c/${breadCrumb}`}>
                    {breadCrumb}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}

            <BreadcrumbItem>
              <BreadcrumbPage> {category}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {filters.properties && <Filters filters={filters.properties} />}
        {children}
      </div>
    </div>
  );
}
