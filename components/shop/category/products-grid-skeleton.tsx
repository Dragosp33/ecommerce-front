import { BuyButton } from '@/components/product/[id]/buttons';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { generateVariantUrl } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ProductsGridSkeleton() {
  return (
    <Card
      // key={variant.productId}
      className='flex flex-col items-center h-[360px] relative overflow-hidden'
    >
      <Link href={'/'}>
        <CardContent>
          <div
            className={`${shimmer} relative h-[200px] flex align-center justify-center min-w-[150px] mx-5`}
          >
            <div className='object-contain h-[100px] self-center transition-transform scale-125 duration-1000 hover:scale-150 ' />
          </div>
          <div>
            <h1
              className={`text-sm sm:text-md mx-2 w-32 bg-grey-700 ${shimmer}`}
            >
              {}
            </h1>
          </div>
        </CardContent>
      </Link>

      <div className='flex flex-col w-full items-start mt-2 mb-2 absolute bottom-0'>
        <div>
          <p className='text-sm font-light mb-2 ml-2'>
            {' '}
            price: <span className='text-emerald-500'> {'variant.price'}$</span>
          </p>
        </div>

        <Button> buy</Button>
      </div>
    </Card>
  );
}

export function ProductsSkeleton() {
  return (
    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4'>
      <div className='mt-3 mb-3'>
        <ProductsGridSkeleton />
      </div>
      <div className='mt-3 mb-3'>
        <ProductsGridSkeleton />
      </div>{' '}
      <div className='mt-3 mb-3'>
        <ProductsGridSkeleton />
      </div>{' '}
      <div className='mt-3 mb-3'>
        <ProductsGridSkeleton />
      </div>{' '}
      <div className='mt-3 mb-3'>
        <ProductsGridSkeleton />
      </div>
    </div>
  );
}
