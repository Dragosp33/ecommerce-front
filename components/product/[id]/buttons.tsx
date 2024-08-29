'use client';

import { Button } from '@/components/ui/button';
import { FaCartPlus } from 'react-icons/fa';

export const BuyButton = () => {
  return (
    <Button
      variant='outline'
      className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400'
    >
      Add to cart
      <FaCartPlus />
    </Button>
  );
};
