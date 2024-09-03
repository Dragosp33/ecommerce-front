'use client';

import { Button } from '@/components/ui/button';
import { CartContext } from '@/hooks/cart-provider';
import { CartProduct } from '@/lib/types';
import { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';

export const BuyButton = ({ cartProduct }: { cartProduct: CartProduct }) => {
  const context = useContext(CartContext);

  if (!context) {
    return (
      <Button
        //variant='outline'
        //variant='secondary'
        size={'lg'}
        className='w-full'
        disabled
        //className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 w-full hover:animate-pulse'
      >
        Add to cart
        <FaCartPlus />
      </Button>
    );
  }

  return (
    <Button
      //variant='outline'
      //variant='secondary'
      size={'lg'}
      className='w-full'
      onClick={() => {
        context.addProduct(cartProduct);
      }}
      //className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 w-full hover:animate-pulse'
    >
      Add to cart
      <FaCartPlus />
    </Button>
  );
};
