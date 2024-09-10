'use client';

import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      let url =
        `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/category-tree` ||
        `http://admin.shop.localhost:3001/api/category-tree`;
      const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 10 },
      });
      const categories = await res.json();
      console.log('USEEFFECT????????');
      console.log(categories);
      if (categories && categories.length > 0) {
        setCategories(categories);
      }
    }

    getCategories();
  }, []);

  if (!categories || categories.length < 1) {
    return <li> Sorry, no categories found</li>;
  }

  return (
    <div>
      {/*categories.map((category: any) => (
        
          {category.path === null ||
            (category.parent === null && (
              <li key={category.name}>{category.name}</li>
            ))}
        
      ))*/}
      {categories.filter((category: any) => {
        category.path === null;
      })}
    </div>
  );
}

//export default CategoriesDropdown;

// Recursive component to render each category and its children
const CategoryItem = ({ category }: { category: any }) => {
  /*const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };*/

  return (
    <div>
      {/* Render category name with a dropdown trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div style={{ cursor: 'pointer', margin: '5px 0' }}>
            {category.name}
            {/*category.children && category.children.length > 0 && (
              <span style={{ marginLeft: "5px" }}>{isOpen ? "▲" : "▼"}</span>
            )*/}
          </div>
        </DropdownMenuTrigger>

        {/* Render dropdown content if there are children */}
        {category.children && category.children.length > 0 && (
          <DropdownMenuContent>
            {category.children.map((child: any) => (
              <DropdownMenuItem key={child.id}>
                <CategoryItem category={child} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

// Main menu component to display categories
const CategoryMenu = () => {
  // Filter main categories (categories without a parent)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      let url =
        `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/category-tree` ||
        `http://admin.shop.localhost:3001/api/category-tree`;
      const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 10 },
      });
      const categories = await res.json();
      console.log('USEEFFECT????????');
      console.log(categories);
      if (categories && categories.length > 0) {
        setCategories(categories);
      }
    }

    getCategories();
  }, []);

  if (!categories || categories.length < 1) {
    return <li> Sorry, no categories found</li>;
  }
  const mainCategories = categories.filter(
    (category: any) => !category.parent || !category.path
  );

  return (
    <div>
      {mainCategories.map((category: any) => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </div>
  );
};

export default CategoryMenu;

export function TestDropdown({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenuContent>
      <ul>{children}</ul>
    </DropdownMenuContent>
  );
}
