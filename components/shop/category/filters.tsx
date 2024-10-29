'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { FilterSheet } from './filters-sheet';

interface CategoryFiltersProps {
  filters: Record<string, string[]>;
}

const Filters = React.memo(({ filters }: CategoryFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log('REACT MEMO;;');

  // Helper function to check if a filter is selected
  const isFilterSelected = (filterKey: string, filterValue: string) => {
    const currentValues = searchParams.get(filterKey)?.split(';') || [];
    return currentValues.includes(filterValue);
  };
  const handleFilterChange = useCallback(
    (filterKey: string, filterValue: string) => {
      const searchParams = new URLSearchParams(window.location.search);

      // Update the URL parameters
      if (searchParams.has(filterKey)) {
        const currentValues = searchParams.get(filterKey)?.split(';') || [];
        if (currentValues.includes(filterValue)) {
          // Remove the filter if it is already selected
          const newValues = currentValues.filter((v) => v !== filterValue);
          newValues.length
            ? searchParams.set(filterKey, newValues.join(';'))
            : searchParams.delete(filterKey);
        } else {
          // Add new value if it's not selected
          searchParams.set(
            filterKey,
            [...currentValues, filterValue].join(';')
          );
        }
      } else {
        // Add the filter if it is not present in the URL
        searchParams.set(filterKey, filterValue);
      }

      // Push the updated URL without a page reload
      // Use router.replace to avoid a full page reload
      router.push(
        `/shop/c/${window.location.pathname
          .split('/')
          .pop()}?${searchParams.toString()}`

        //{ shallow: true }
      );
    },
    [router]
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log('NAME, VALUE', name, value);
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(name)) {
        //params.set(name, value);
        params.set(name, params.get(name)?.concat(value) || '');
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <FilterSheet filters={filters} handleChange={handleFilterChange} />
    </div>
  );
});

// Add a display name to the memoized component
Filters.displayName = 'Filters';

export default Filters;
