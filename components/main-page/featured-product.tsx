import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from '../ui/badge';
import { RiSparkling2Fill } from 'react-icons/ri';
import { BuyButton } from '../product/[id]/buttons';

const FeaturedProduct = () => {
  return (
    <div className='bg-gray-900 text-white py-12'>
      <div className='max-w-[800px] flex items-center'>
        {/* columnwrapper here */}
        <div className='grid gap-10 md:grid-cols-[1.1fr_0.9fr] columnWrapper'>
          <div className='flex items-center order-2 md:order-none'>
            <div>
              <h1 className='m-0 font-normal text-2xl md:text-5xl'>macbook</h1>
              <p className='text-gray-400 text-sm mt-2'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                hic quisquam minima vitae cupiditate maiores sequi consequuntur
                dolores sint animi voluptatum adipisci sunt, earum repellat,
                iste eaque corporis quibusdam fugiat!
              </p>
              <div className='flex gap-2.5 mt-6'>
                <Button variant={'outline'}>
                  <Link href={`/product/${11}`}>Read more</Link>
                </Button>
                <Button variant={'outline'}>
                  <FaShoppingCart />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <Image
              src='https://photobucket333.s3.eu-west-3.amazonaws.com/permanent/featured_product.png'
              alt=''
              //className='max-w-full max-h-[200px] mx-auto md:max-h-none'
              width={'200'}
              height={'200'}
              //className='relative'
              className='object-contain max-w-full max-h-[200px] md:max-h-full block'
              //fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatProduct = async () => {
  let product;
  try {
    let url =
      `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/featured-product` ||
      `http://admin.shop.localhost:3001/api/featured-product`;
    const res = await fetch(url, {
      method: 'GET',
      next: { revalidate: 10 },
    });
    product = await res.json();
  } catch {
    product = {};
  }

  console.log(product.variants);

  if (
    !product ||
    !product.variants ||
    product.variants.length < 1 ||
    !product.variants[0].stock ||
    product.variants[0].stock === 0
  ) {
    return (
      <div className='md:container mt-5 mb-5 md:mt-2 max-w-screen-2xl'>
        <div className='grid sm:grid-cols-[1.1fr_0.9fr]   min-h-[70vh] '>
          <div className='pl-2 order-2 sm:order-none flex justify-center flex-col'>
            <h1 className='lg:text-4xl md:text-2xl sm:text-xl text-md mb-5 mx-2 font-bold'>
              Macbook 14 PRO
            </h1>
            <Badge
              variant={'success'}
              className='mb-5 max-w-[100px] text-zinc-900'
            >
              <RiSparkling2Fill className='mr-1' /> Featured
            </Badge>
            <p className='mx-3'>This item is out of stock...</p>
            <p>Please keep an eye out.</p>
            <div className='flex gap-2.5 mt-6'>
              <Button variant={'outline'}>
                <Link href={`#`} aria-disabled>
                  Read more
                </Link>
              </Button>

              <Button disabled>
                <FaShoppingCart />
                Add to cart
              </Button>
            </div>
            <div className='text-sm text-red'> out of stock</div>
          </div>
          <div className='relative min-h-[200px]'>
            <Image
              src='https://photobucket333.s3.eu-west-3.amazonaws.com/permanent/featured_product.png'
              alt='Next.js Logo'
              className='object-contain min-h-[100px]'
              fill
              sizes='(max-width: 768px) 99vw, (max-width: 1200px) 50vw, 33vw'
              priority
            />
          </div>
        </div>
      </div>
    );
  }
  const variant = product.variants[0];
  return (
    <div className='md:container mt-5 mb-5 md:mt-2 max-w-screen-2xl'>
      <div className='grid sm:grid-cols-[1.1fr_0.9fr]   min-h-[70vh] '>
        <div className='pl-2 order-2 sm:order-none flex justify-center flex-col'>
          <h1 className='lg:text-4xl md:text-2xl sm:text-xl text-md mb-5 mx-2 font-bold'>
            {product.title}
          </h1>
          <Badge
            variant={'success'}
            className='mb-5 max-w-[100px] text-zinc-900'
          >
            <RiSparkling2Fill className='mr-1' /> Featured
          </Badge>
          <p className='mx-3'>{variant.description}</p>

          <h1 className='mx-3 mt-3 text-xl font-bold text-emerald-500'>
            {' '}
            {variant.price} ${' '}
          </h1>
          <p className='text-sm font-light mx-3'>
            {' '}
            the price shown is for the current configuration in the description.
            To view prices for more configurations, press{' '}
            <span className='font-semibold'> Read more </span>{' '}
          </p>

          <div className='flex gap-2.5 mt-6'>
            <Button variant={'outline'} size={'lg'}>
              <Link href={`/product/${product.id}`}>Read more</Link>
            </Button>
          </div>
        </div>
        <div className='relative min-h-[200px]'>
          <Image
            src={variant.thumbnail}
            alt='Next.js Logo'
            className='object-contain min-h-[100px]'
            fill
            sizes='(max-width: 768px) 99vw, (max-width: 1200px) 50vw, 33vw'
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default FeatProduct;
