import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { generateVariantUrl } from '@/lib/utils';

export async function Best({
  limit,
}: {
  limit?: string | number | null | undefined;
}) {
  let apiLimit = 5;
  if (limit) {
    apiLimit = Number(limit) || 5;
  }
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/best-sellers` ||
    `http://admin.shop.localhost:3001/api/best-sellers?limit=${apiLimit}`;
  const res = await fetch(url, {
    method: 'GET',
    next: { revalidate: 10 },
  });
  const products = await res.json();
  console.log({ products });
  return (
    <div className='w-full py-10'>
      <div className='max-w-screen-2xl md:container mx-2'>
        <h1 className='lg:text-2xl md:text-xl sm:text-lg text-md mb-5 mx-2 font-bold'>
          {' '}
          Best sellers{' '}
        </h1>
        {/*<div className='flex flex-row space-x-16 max-w-[90vw]'>
          {products.map((product: any) => (
            <Card
              key={product._id}
              className='flex flex-col items-center justify-center'
            >
              <div className=' relative h-[200px] flex align-center justify-center min-w-[150px] mx-5'>
                <Image
                  //width={150}
                  //height={150}
                  fill
                  src={product.variants[0].thumbnail}
                  alt='....'
                  className='object-contain max-h-[100px] self-center transition-transform duration-1000 hover:scale-125 '
                />
              </div>
            </Card>
          ))}
        </div>
        */}
        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4'>
          {products.map((product: any) => (
            <>
              <Link
                href={generateVariantUrl({
                  ...product.variant,
                  productId: product._id.toString(),
                })}
              >
                <Card
                  key={product._id}
                  className='flex flex-col items-center h-[360px] relative overflow-hidden'
                >
                  <div className=' relative h-[200px] flex align-center justify-center min-w-[150px] mx-5'>
                    <Image
                      //width={150}
                      //height={150}
                      fill
                      src={product.variant.thumbnail}
                      alt='....'
                      className='object-contain max-h-[100px] self-center transition-transform scale-125 duration-1000 hover:scale-150 '
                    />
                  </div>
                  <div>
                    <h1 className='text-sm sm:text-md mx-2 '>
                      {product.variant.title}
                    </h1>
                  </div>
                  <div className='flex flex-col w-full items-start mt-2 mb-2 absolute bottom-0'>
                    <div>
                      <p className='text-sm font-light mb-2 ml-2'>
                        {' '}
                        price:{' '}
                        <span className='text-emerald-500'>
                          {' '}
                          {product.variant.price}$
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
              {/*<Link href={`/product/${product._id.toString()}`}>
                <Card
                  key={product._id}
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
              </Link>*/}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
