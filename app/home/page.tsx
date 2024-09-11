import { ModeToggle } from '@/components/theme-toggle';

import { lusitana } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { LoginButton } from '@/components/auth/login-button';
import FeaturedProduct from '@/components/main-page/featured-product';
import FeatProduct from '@/components/main-page/featured-product';
import { revalidatePath } from 'next/cache';
import { Latest } from '@/components/main-page/latest-products.tsx/latest';
import { PiWaveSine } from 'react-icons/pi';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function HomePage() {
  return (
    <div className='sm:container  w-full'>
      <FeatProduct />;
      <Latest showShop={true} />
      <div className='flex items-center justify-center h-screen relative max-w-screen overflow-hidden'>
        <div className='w-32 h-32 bg-indigo-500 animate-blob absolute z-10'></div>
        <PiWaveSine className='w-[400px] h-[200px] absolute animate-spin-slow' />
        <p className='z-20 '> ShopShift </p>
      </div>
    </div>
  );
}
