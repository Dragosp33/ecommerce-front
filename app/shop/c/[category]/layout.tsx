//'use client';

import Filters from '@/components/shop/category/filters';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  console.log('FILTERS:::: ', filters.properties);
  let breadCrumbs: string[] = [];
  if (filters.path) {
    breadCrumbs = filters.path.replace(/^,|,$/g, '').split(',');
  }
  //breadCrumbs.push(category);
  //breadCrumbs.push(category);
  //breadCrumbs.push(category);
  //breadCrumbs.push(category);

  return (
    <div className='w-full bg-secondary'>
      <div className='max-w-screen-2xl md:container md:px-10 sm:px-5 px-2 mx-auto'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={'/shop'}>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {breadCrumbs.length > 3 ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/shop/c/${breadCrumbs[0]})}`}>
                    {decodeURIComponent(breadCrumbs[0])}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-1'>
                      <BreadcrumbEllipsis className='h-4 w-4' />
                      <span className='sr-only'>Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Themes</DropdownMenuItem>
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/shop/c/${breadCrumbs[breadCrumbs.length - 1]}`}
                  >
                    {decodeURIComponent(breadCrumbs[breadCrumbs.length - 1])}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              breadCrumbs.map((breadCrumb: string) => {
                return (
                  <React.Fragment key={breadCrumb}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/shop/c/${breadCrumb}`}>
                        {decodeURIComponent(breadCrumb)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                );
              })
            )}

            <BreadcrumbItem>
              <BreadcrumbPage> {decodeURIComponent(category)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {filters.properties && <Filters filters={filters.properties} />}
        {children}
      </div>
    </div>
  );
}
