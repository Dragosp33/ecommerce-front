import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from '../ui/badge';
import { RiSparkling2Fill } from 'react-icons/ri';

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

const FeatProduct = () => {
  return (
    <div className='mt-5 md:mt-2'>
      <div className='grid sm:grid-cols-[1.1fr_0.9fr]   min-h-[70vh] '>
        <div className='pl-2 order-2 sm:order-none flex justify-center flex-col'>
          <h1 className='text-4xl mb-5 mx-2 font-bold'>Macbook 14 PRO</h1>
          <Badge
            variant={'success'}
            className='mb-5 max-w-[100px] text-zinc-900'
          >
            <RiSparkling2Fill className='mr-1' /> Featured
          </Badge>
          <p className='mx-3'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse hic
            quisquam minima vitae cupiditate maiores sequi consequuntur dolores
            sint animi voluptatum adipisci sunt, earum repellat, iste eaque
            corporis quibusdam fugiat!
          </p>
          <div className='flex gap-2.5 mt-6'>
            <Button variant={'outline'}>
              <Link href={`/product/${11}`}>Read more</Link>
            </Button>
            <Button>
              <FaShoppingCart />
              Add to cart
            </Button>
          </div>
        </div>
        <div className='relative'>
          <Image
            src='https://photobucket333.s3.eu-west-3.amazonaws.com/permanent/featured_product.png'
            alt='Next.js Logo'
            className='object-contain'
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default FeatProduct;
