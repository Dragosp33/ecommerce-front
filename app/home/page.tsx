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

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function HomePage() {
  return (
    <div className='sm:container  w-full'>
      <FeatProduct />;
      <Latest />
    </div>
  );
}
