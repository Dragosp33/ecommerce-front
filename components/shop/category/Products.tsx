'use server';
import { Card, CardContent } from '@/components/ui/card';
import { generateVariantUrl } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { BuyButton } from '@/components/product/[id]/buttons';
import { notFound } from 'next/navigation';

interface Variant {
  productId: string;
  title: string;
  thumbnail: string;
  properties: Record<string, string>;
  price: string | number;
  SKU: string;
}

function VariantCard({ variant }: { variant: Variant }) {
  console.log('VARIANT CARDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', variant);
  return (
    <Card
      // key={variant.productId}
      className='flex flex-col items-center h-[360px] relative overflow-hidden'
    >
      <Link href={generateVariantUrl(variant)}>
        <CardContent>
          <div className=' relative h-[200px] flex align-center justify-center min-w-[150px] mx-5'>
            <Image
              //width={150}
              //height={150}
              fill
              src={variant.thumbnail}
              alt='....'
              className='object-contain max-h-[100px] self-center transition-transform scale-125 duration-1000 hover:scale-150 '
            />
          </div>
          <div>
            <h1 className='text-sm sm:text-md mx-2 '>{variant.title}</h1>
          </div>
        </CardContent>
      </Link>

      <div className='flex flex-col w-full items-start mt-2 mb-2 absolute bottom-0'>
        <div>
          <p className='text-sm font-light mb-2 ml-2'>
            {' '}
            price: <span className='text-emerald-500'> {variant.price}$</span>
          </p>
        </div>

        <BuyButton
          cartProduct={{
            title: variant.title,
            SKU: variant.SKU,
            properties: variant.properties,
            productId: variant.productId,
            price: variant.price,
            thumbnail: variant.thumbnail,
            quantity: 1,
          }}
          btnVariant='outline'
        />
      </div>
    </Card>
  );
}

export async function CategoryProducts({
  name,
  params,
}: {
  name: string;
  params: any;
}) {
  console.log(params);
  let products = [];
  try {
    let url =
      `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/products-cat/${name}?` ||
      `http://admin.shop.localhost:3001/api/products-cat/${name}?`;

    const urlParams: string[] = [];

    // Collect the provided searchParams
    for (const [key, value] of Object.entries(params || {})) {
      console.log(key, value);
      urlParams.push(`${key}=${value}`);
    }

    console.log('URL IN PRODUCTS.TSXXXXXXXXXXXXXXXXXXXXXXX');
    console.log(url);
    const res = await fetch(url + urlParams.join('&'), {
      method: 'GET',
      next: { revalidate: 10 },
    });

    products = await res.json();

    console.log('MATCHED: ', products.matchedVariants);
    if (
      !products ||
      !products.matchedVariants ||
      products.matchedVariants.length < 1
    ) {
      return (
        <div>
          <p> Sorry, we could not find any products </p>
        </div>
      );
    }
  } catch {
    notFound();
  }
  return (
    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4'>
      {products.matchedVariants.map((variant: any) => (
        <div key={variant.SKU} className='mt-3 mb-3'>
          <VariantCard variant={variant} />
        </div>
      ))}
    </div>
  );
}

export async function CategoryByIdProducts({ id }: { id: string }) {
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/products/${id}` ||
    `http://admin.shop.localhost:3001/api/products/${id}`;
  const res = await fetch(url, {
    method: 'GET',
    next: { revalidate: 10 },
  });
  const products = await res.json();
  console.log({ products });
  return <div>hello</div>;
}
