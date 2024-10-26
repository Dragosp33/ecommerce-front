'use server';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

const CategoryItem = ({ category }: { category: any }) => {
  //console.log(' Category is: ', category);

  return (
    <div className=''>
      {/* Render category name with a dropdown trigger */}
      {category.children && category.children.length > 0 ? (
        <Collapsible>
          <CollapsibleTrigger
            className='group flex w-full items-center justify-between gap-4 px-2 py-2 text-sm font-small [&[data-state=open]>svg]:rotate-90'
            asChild
          >
            <Button variant={'ghost'}>
              {category.name}

              <ChevronRightIcon className='h-5 w-5 transition-all group-data-[state=open]:text-emerald-500' />
            </Button>
          </CollapsibleTrigger>

          {/* Render dropdown content if there are children */}

          <CollapsibleContent className=' border-b-2'>
            <div key={`sub-${category.id}`} className='ml-2'>
              <Button variant={'link'} asChild>
                <Link href={`/shop/c/${category.name}`}>
                  {' '}
                  view all from {category.name}
                </Link>
              </Button>
            </div>
            {category.children.map((child: any) => (
              <div key={child.id} className='ml-2'>
                <CategoryItem category={child} />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Button variant={'link'} asChild>
          <Link href={`/shop/c/${category.name}`}> {category.name}</Link>
        </Button>
      )}
    </div>
  );
};

export async function ServerCategories() {
  let categories = [];
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/category-tree` ||
    `http://admin.shop.localhost:3001/api/category-tree`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      next: { revalidate: 10 },
    });
    categories = await res.json();
    //console.log('USEEFFECT????????');
    //console.log(categories);
  } catch {
    categories = [];
  }
  if (!categories || categories.length < 1) {
    return <div>sorry, no categories found yet..</div>;
  }

  const mainCategories = categories.filter(
    (category: any) => !category.parent || !category.path
  );
  return (
    <div className='min-w-[250px]'>
      {mainCategories.map((category: any) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
