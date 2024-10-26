import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

export async function Latest({
  limit,
  showShop,
}: {
  limit?: string | number | null | undefined;
  showShop: boolean;
}) {
  let apiLimit = 5;
  if (limit) {
    apiLimit = Number(limit) || 5;
  }
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/latest-products` ||
    `http://admin.shop.localhost:3001/api/latest-products?limit=${apiLimit}`;
  const res = await fetch(url, {
    method: 'GET',
    next: { revalidate: 10 },
  });
  const products = await res.json();
  //console.log({ products });
  return (
    <div className='w-full bg-secondary text-secondary-foreground py-10'>
      <div className='max-w-screen-2xl md:container mx-2'>
        <h1 className='lg:text-2xl md:text-xl sm:text-lg text-md mb-5 mx-2 font-bold'>
          {' '}
          Latest Products{' '}
        </h1>

        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4'>
          {products.map((product: any) => (
            <div key={product._id.toString()}>
              <Link href={`/product/${product._id.toString()}`}>
                <Card
                  //key={product._id}
                  className='flex flex-col items-center justify-center'
                >
                  <div className=' relative h-[200px] flex align-center justify-center min-w-[150px] mx-5'>
                    <Image
                      //width={150}
                      //height={150}
                      fill
                      src={product.variants[0].thumbnail}
                      alt='....'
                      className='object-contain max-h-[100px] self-center transition-transform scale-125 duration-1000 hover:scale-150 '
                    />
                  </div>
                  <div>
                    <h1>{product.title}</h1>
                  </div>
                  <div className='flex flex-col w-full items-start mt-2 mb-2'>
                    <div>
                      <p className='text-sm font-light mb-2 ml-2'>
                        {' '}
                        starting at:{' '}
                        <span className='text-emerald-500'>
                          {' '}
                          {product.variants.reduce(
                            (min: any, variant: any) =>
                              variant.price < min ? variant.price : min,
                            product.variants[0].price
                          )}{' '}
                          $
                        </span>
                      </p>
                    </div>

                    <Button
                      size={'sm'}
                      variant={'outline'}
                      className='w-full self-center px-5 w-[90%]'
                    >
                      {' '}
                      See more{' '}
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
          {showShop && (
            <div className='w-full flex items-center justify-center mt-5 sm:mt-0'>
              <Link href={'/shop'}>
                {' '}
                <Button
                  size={'lg'}
                  className=' self-center rounded-full h-44 w-44 flex flex-col items-center '
                  type='button'
                >
                  Shop more <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
