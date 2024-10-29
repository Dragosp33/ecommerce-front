'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

interface CategoryFiltersProps {
  filters: Record<string, string[]>;
}

const FiltersTest = ({ filters }: CategoryFiltersProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isFilterSelected = (filterKey: string, filterValue: string) => {
    const currentValues = searchParams.get(filterKey)?.split(';') || [];
    return currentValues.includes(filterValue);
  };
  const handleFiltersChange = (
    key: string,
    value: string,
    checked: boolean
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    //if (current.has(key)) {
    if (!checked) {
      current.set(key, current.get(key)?.concat(`;${value}`) || value);
      //}
    } else {
      //urrent.set(key, current.get(key)?.replace(value, '') || '');
      let list = current.get(key)?.split(';');
      list = list?.filter((val: string) => val !== value);
      console.log(list);
      const k = list?.join(';');
      console.log('joined is: ', k);
      if (k) {
        current.set(key, k);
      } else {
        current.delete(key);
      }

      ///current.get(key)?.replace(";")
    }

    router.push(`${pathname}?${current}`);
  };
  const ffTest = {
    color: [
      'black',
      'white',
      'yellow',
      'blue',
      'green',
      'rose',
      'red',
      'gold',
      'purple',
      'titanium-grey',
    ],
    brand: ['Apple', 'Samsung'],
    RAMMemory: ['8GB', '16GB', '36GB', '48GB'],
    SSD: ['512GB', '1TB'],
    processor: ['M3', 'M3-PRO', 'M3-MAX'],
    'storage(GB)': ['64', '128', '256'],
  };
  return (
    <div>
      {Object.entries(ffTest).map(([key, values]) => (
        <div key={key}>
          {values.map((value: string) => (
            <label key={value} className='text-sm'>
              <input
                type='checkbox'
                value={value}
                checked={isFilterSelected(key, value)}
                onChange={(e) => {
                  //e.target.checked = !e.target.checked; // This toggles the checked state to mimic the default behavior
                  handleFiltersChange(key, value, !e.target.checked);
                }}
              />{' '}
              {value}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FiltersTest;
