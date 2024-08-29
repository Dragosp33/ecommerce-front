'use client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlineCheck } from 'react-icons/md';

export default function ProductDropdown({
  exactMatch,
  relatedVariants,
  searchParams,
  params,
}: {
  exactMatch: any;
  relatedVariants: any;
  searchParams: any;
  params: any;
}) {
  return (
    <div>
      {Object.entries(exactMatch.properties).map(([key, value]) => (
        <div
          key={key}
          style={{ marginBottom: '1rem' }}
          className='flex flex-row items-center'
        >
          <label htmlFor={key}>{key}</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                {String(value)}
                <IoMdArrowDropdown className='w-5 h-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              {relatedVariants
                .map((variant: any) => variant.properties[key]) // Get the relevant property value from each related variant
                .filter((v: any, i: any, self: any) => self.indexOf(v) === i) // Remove duplicates
                .map((relatedValue: any) => {
                  // Generate new search params
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set(key, relatedValue);

                  return (
                    <DropdownMenuItem asChild key={relatedValue}>
                      <Link
                        href={`/product/${
                          params.id
                        }?${newSearchParams.toString()}`}
                        className='w-full cursor-pointer pr-4'
                      >
                        {' '}
                        {relatedValue}
                        {relatedValue === exactMatch.properties[key] && (
                          <MdOutlineCheck className='absolute right-0' />
                        )}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
