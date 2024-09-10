'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useCallback } from 'react';

/*interface CategoryFiltersProps {
  filters: Record<string, string[]>;
}*/

export function FilterSheet({
  filters,
  handleChange,
}: {
  filters: Record<string, string[]>;
  handleChange: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Helper function to check if a filter is selected
  const isFilterSelected = (filterKey: string, filterValue: string) => {
    const currentValues = searchParams.get(filterKey)?.split(';') || [];
    return currentValues.includes(filterValue);
  };

  /*const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log('NAME, VALUE', name, value);
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(name)) {
        //params.set(name, value);
          //console.log(params.get(name)?.match(value));
          if (params.get(name)?.match(value)) {
              params.set(name, params.get('name')?.replace(`;${value}`))
          }
            params.set(name, params.get(name)?.concat(`;${value}`) || '');
      } else {
        params.set(name, value);
      }
      router.push(pathname + '?' + params.toString()); // params.toString();
    },
    [searchParams]
  );*/
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Filters </Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-scroll max-h-[100vh]'>
        <SheetHeader className='mb-4'>
          <SheetTitle>Choose filters</SheetTitle>
          <SheetDescription>
            For a faster filtering, please make sure you are on the sub-category
            you wish for.
          </SheetDescription>
        </SheetHeader>
        {/*<div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' value='Pedro Duarte' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Input id='username' value='@peduarte' className='col-span-3' />
          </div>
        </div>*/}

        {Object.entries(filters).map(([key, values]) => (
          <div key={key}>
            <Collapsible className='border-b-2 mb-2'>
              <CollapsibleTrigger>{key}</CollapsibleTrigger>
              <CollapsibleContent className='flex flex-col ml-2'>
                {values.map((value: string) => (
                  <label key={value} className='text-sm'>
                    <input
                      type='checkbox'
                      value={value}
                      checked={isFilterSelected(key, value)}
                      onChange={(e) => {
                        e.target.checked = !e.target.checked; // This toggles the checked state to mimic the default behavior
                        handleChange(key, value);
                      }}
                    />{' '}
                    {value}
                  </label>
                ))}
              </CollapsibleContent>{' '}
            </Collapsible>
          </div>
        ))}

        <SheetFooter className='mt-4'>
          <SheetClose asChild>
            <Button type='button'>See your changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
