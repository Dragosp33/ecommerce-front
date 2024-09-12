import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { CartContext } from '@/hooks/cart-provider';
import { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TiDeleteOutline } from 'react-icons/ti';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TiShoppingCart } from 'react-icons/ti';

import { generateVariantUrl } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function CartHoverCard() {
  const pathname = usePathname();
  const context = useContext(CartContext);

  const products = context?.cartProducts || [];

  //const products = context ? Object.keys(context.cartProducts).length : 0;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          href='/cart'
          className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
            pathname.includes('/cart')
              ? 'text-foreground/100'
              : 'text-foreground/60'
          }`}
        >
          Cart{' '}
          {context?.totalProducts !== undefined &&
            context.totalProducts > 0 &&
            `(${context.totalProducts})`}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className='w-64 mr-4 flex flex-col mb-0'>
        {products.length > 0 ? (
          // If there are products in the cart, display them
          <>
            {products.map((product) => (
              <div
                className='flex justify-between space-x-4 mb-2 text-xs border-b-2'
                key={product.SKU}
              >
                <Avatar className='self-center'>
                  <AvatarImage
                    src={product.thumbnail}
                    className='object-contain'
                  />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={generateVariantUrl(product)}>
                    {' '}
                    {product.title}{' '}
                  </Link>
                </div>
                <div className='flex flex-col justify-between'>
                  {product.price} x {product.quantity}
                  <Button
                    onClick={() => {
                      context?.removeWholeQuantity(product.SKU);
                    }}
                    size='sm'
                    className='text-sm border-0 mt-2'
                    variant='outline'
                  >
                    <TiDeleteOutline className='w-4 h-4 p-0' />
                  </Button>
                </div>
              </div>
            ))}
            {/* Display total price if there are products */}
            <div className='flex justify-between space-x-4 text-xs mt-2'>
              <p>Total:</p>
              <p>{context?.totalPrice}</p>
            </div>
            <div className='w-full'>
              <Button asChild className='w-full dark:bg-[#5542F6] mt-2'>
                <Link href={'/cart'}> Go to cart</Link>
              </Button>
            </div>
          </>
        ) : (
          // Display a message when the cart is empty
          <div className='text-center text-gray-500 w-full'>Cart is empty</div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

export function CartBadge({ number }: { number: number }) {
  return (
    <Badge className='text-xs absolute top-0 -left-2 w-4 h-4 p-0 rounded-full flex items-center justify-center'>
      <p> {number}</p>
    </Badge>
  );
}

export function SmallCartDropdown() {
  const pathname = usePathname();
  const context = useContext(CartContext);

  const products = context?.cartProducts || [];

  if (!context) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TiShoppingCart className='w-6 h-6' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div>Cart is empty</div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='mr-2'>
        <div className='relative'>
          <TiShoppingCart className=' w-6 h-6 relative' />
          {context?.totalProducts !== undefined &&
            context.totalProducts > 0 && (
              <CartBadge number={context.totalProducts} />
            )}{' '}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='mt-2 shadow-2xl w-[99vw] md:hidden'>
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <div
                className='flex justify-between space-x-4 mb-2 text-xs border-b-2'
                key={product.SKU}
              >
                <Avatar className='self-center'>
                  <AvatarImage
                    src={product.thumbnail}
                    className='object-contain'
                  />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className='text-pretty max-w-[200px] break-all'>
                  <Link href={generateVariantUrl(product)}>
                    {' '}
                    {product.title}{' '}
                  </Link>
                </div>
                <div className='flex flex-col justify-between'>
                  {product.price} x {product.quantity}
                  <Button
                    onClick={() => context.removeWholeQuantity(product.SKU)}
                    size='sm'
                    className='text-sm border-0 mt-2'
                    variant='outline'
                  >
                    <TiDeleteOutline className='w-4 h-4 p-0' />
                  </Button>
                </div>
              </div>
            ))}
            {/* Total price section */}
            <div className='flex justify-between space-x-4 text-xs mt-2'>
              <p>Total:</p>
              <p>{context.totalPrice}</p>
            </div>
            <div className='w-full mt-2'>
              <Button asChild className='w-full dark:bg-[#5542F6] mt-2'>
                <Link href={'/cart'}> Go to cart</Link>
              </Button>
            </div>
          </>
        ) : (
          // Display message when cart is empty
          <div className='text-center py-2 text-gray-500'>Cart is empty</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
