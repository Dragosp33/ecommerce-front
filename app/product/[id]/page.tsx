import { BuyButton } from '@/components/product/[id]/buttons';
import BuyProductCard from '@/components/product/[id]/buy-product-card';
import Gallery from '@/components/product/[id]/gallery';
import MemoGallery from '@/components/product/[id]/memoGallery';
import ProductDropdown from '@/components/product/[id]/properties-link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

export default async function Product({
  searchParams,
  params,
}: {
  searchParams?: Record<string, string>;
  params: { id?: string };
}) {
  console.log(searchParams, params);
  const id = params?.id || '1';
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/product/${params.id}?` ||
    `http://admin.shop.localhost:3001/api/product/${params.id}?`;
  const urlParams: string[] = [];

  // Collect the provided searchParams
  for (const [key, value] of Object.entries(searchParams || {})) {
    urlParams.push(`${key}=${value}`);
  }

  console.log({ url });
  //const res = await fetch(url, { method: 'GET' });

  const res = await fetch(url + urlParams.join('&'), {
    method: 'GET',
    next: { revalidate: 10 },
  });

  const parsedRes = await res.json();
  console.log(parsedRes);
  if (parsedRes.error || !parsedRes.exactMatch) {
    return notFound();
  }
  console.log(parsedRes);
  const { exactMatch, relatedVariants, categoryInfo } = parsedRes;

  const breadCrumbs = categoryInfo.path.replace(/^,|,$/g, '').split(',');

  //const

  // Check if searchParams are missing any properties present in exactMatch
  const missingParams = Object.entries(exactMatch.properties).filter(
    ([key, value]) => !searchParams?.[key]
  );

  if (missingParams.length > 0) {
    // Collect missing parameters
    for (const [key, value] of missingParams) {
      urlParams.push(`${key}=${String(value)}`);
    }

    // Redirect to the updated URL without a trailing "&"
    return redirect(`/product/${id}?${urlParams.join('&')}`);
  }

  const stock = exactMatch.stock;

  return (
    <div className='sm:container w-full max-w-screen-2xl'>
      <div className='flex flex-col md:mx-8 mx-6'>
        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumbs.map((breadCrumb: string) => (
              <React.Fragment key={breadCrumb}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/c/${breadCrumb}`}>
                    {breadCrumb}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}

            <BreadcrumbItem>
              <BreadcrumbPage> {categoryInfo.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='w-full'>
          <h1 className='text-xl font-semibold'> {exactMatch.title} </h1>
        </div>
        <div className='flex w-full flex-col md:flex-row items-start relative mt-0'>
          <div className='w-full md:max-w-xl md:sticky top-0 mr-8'>
            <MemoGallery images={exactMatch.photos} />

            <Button
              className='block lg:hidden w-full underline'
              variant='secondary'
              asChild
            >
              <Link
                className='flex flex-row w-full justify-between w-full'
                href={'/'}
              >
                Category
                <span> {categoryInfo.name} </span>
              </Link>
            </Button>
          </div>
          {/* here put max-width: 200px for md */}
          <div className='flex lg:flex-row flex-col-reverse lg:grow-1  justify-around w-full md:w-auto lg:w-full mt-8 max-w-full md:max-w-[200px] lg:max-w-full '>
            <div>
              <ProductDropdown
                exactMatch={exactMatch}
                relatedVariants={relatedVariants}
                searchParams={searchParams}
                params={params}
              />

              <Button
                className='lg:block hidden lg:mr-4 xl:mr-2 underline'
                variant='secondary'
                asChild
              >
                <Link
                  className='flex flex-row w-full justify-between'
                  href={'/'}
                >
                  Category
                  <span> Laptops </span>
                </Link>
              </Button>
            </div>
            <div className='flex flex-col'>
              <BuyProductCard exactMatch={exactMatch} stock={stock} />
              <Card className='mt-4 p-0'>
                <CardContent className='py-4 px-4 flex flex-row justify-between'>
                  <p> Brand: </p>
                  <p> Apple </p>
                </CardContent>
                <CardFooter className='p-0'>
                  <Button
                    className='w-full border-b-0 border-x-0 rounded-t-none rounded-b-xl'
                    variant='outline'
                    asChild
                  >
                    <Link
                      className='flex flex-row w-full justify-between'
                      href={'/'}
                    >
                      See more
                      <FaArrowRight />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <p> {exactMatch.description}</p>
        </div>
      </div>
    </div>
  );
}
