'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { CartContext } from '@/hooks/cart-provider';
import { CartProduct } from '@/lib/types';
import { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';

// Define the enum for button variants
enum ButtonVariant {
  Ghost = 'ghost',
  Link = 'link',
  Destructive = 'destructive',
  Outline = 'outline',
  Default = 'default',
  Secondary = 'secondary',
}

export const BuyButton = ({
  cartProduct,
  disabled,
  btnVariant,
}: {
  cartProduct: CartProduct;
  disabled?: boolean | false;
  btnVariant?:
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'default'
    | 'secondary';
}) => {
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
      disabled={disabled}
      variant={btnVariant || 'default'}
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
