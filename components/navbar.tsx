'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { ModeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { UserButton } from './auth/user-button';
import { GoPlus } from 'react-icons/go';
import { CartHoverCard, SmallCartDropdown } from './cart/cart-hover';

//import { DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MdUserButton } from './auth/md-user-button';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
      {
        //dark:border-b-[#5542F6] dark:border-b-4
      }
      <div className='container h-20 md:h-14 max-w-screen-2xl flex items-center justify-between px-4 py-2 gap-4 md:gap-2'>
        <div className='flex flex-col md:flex-row items-center justify-center text-sm md:text-md gap-2 md:gap-4'>
          <Link className='flex items-center' href='/'>
            <MountainIcon className='w-4 h-4 md:h-6 md:w-6 font-bold' />
            <span className='text-sm md:text-lg font-bold'>ShopShift</span>
          </Link>
          <div className='md:ml-2 ml-0'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'secondary'}
                  className='font-semibold text-sm md:text-md group pl-0 text-xs'
                >
                  <span className='ml-1 text-xs md:text-sm inline-block group-data-[state=open]:hidden mr-2'>
                    {' '}
                    |{' '}
                  </span>
                  <GoPlus
                    className='mr-2 w-4 h-4 group-data-[state=open]:visible group-data-[state=open]:rotate-[135deg] transition-transform delay-300  group-data-[state=closed]:rotate-0
                  group-data-[state=closed]:invisible group-data-[state=closed]:h-0 group-data-[state=closed]:w-0 group-data-[state=open]:duration-700 group-data-[state=closed]:duration-0'
                  />{' '}
                  categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>{children}</DropdownMenuContent>
              {/*<DropdownMenuContent>
                <ServerCategories />
              </DropdownMenuContent>
            </DropdownMenu>*/}
            </DropdownMenu>
          </div>
        </div>

        <div className='hidden md:flex gap-4 items-center justify-center'>
          <Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname === '/' ? 'text-foreground/100' : 'text-foreground/60'
            }`}
            href='/'
          >
            Home
          </Link>

          <Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname.includes('/shop')
                ? 'text-foreground/100'
                : 'text-foreground/60'
            }`}
            href='/shop'
          >
            Shop
          </Link>

          <Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname.includes('/settings')
                ? 'text-foreground/100'
                : 'text-foreground/60'
            }`}
            href='/settings'
          >
            Settings
          </Link>
          {/*<Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname.includes('/cart')
                ? 'text-foreground/100'
                : 'text-foreground/60'
            }`}
            href='/cart'
          >
            
          </Link>*/}
          <CartHoverCard />
          <UserButton />
          <ModeToggle />
        </div>
        <div className='flex flex-row items-baseline self-baseline gap-2 md:hidden'>
          <SmallCartDropdown />
          <Sheet>
            <SheetTrigger asChild>
              <Button className='md:hidden' size='icon' variant='outline'>
                <MenuIcon className='h-6 w-6' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right'>
              <SheetHeader>
                <SheetTitle> ShopShift </SheetTitle>
                <SheetDescription>
                  Find our latest products and best sellers.
                </SheetDescription>
              </SheetHeader>
              <div className='grid grid-cols gap-4 w-[200px] p-4'>
                <SheetClose asChild>
                  <Link
                    className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
                      pathname === '/'
                        ? 'text-foreground/100'
                        : 'text-foreground/60'
                    }`}
                    href='/'
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className={`transition-colors hover:underline hover:text-foreground/80 underline-offset-4 ${
                      pathname.includes('/shop')
                        ? 'text-foreground/100'
                        : ' text-foreground/60'
                    }`}
                    href='/shop'
                  >
                    Shop
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
                      pathname.includes('/settings')
                        ? 'text-foreground/100'
                        : ' text-foreground/60'
                    }`}
                    href='/settings'
                  >
                    Settings
                  </Link>
                </SheetClose>
                <div className='flex flex-row w-full items-center justify-between'>
                  {' '}
                  <MdUserButton />
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}
