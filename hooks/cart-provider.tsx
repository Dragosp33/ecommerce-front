'use client';

import { createContext, useEffect, useMemo, useState } from 'react';

import { CartContextType, CartProduct } from '@/lib/types';

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  // 1. Initialize cartProducts from localStorage on first render
  useEffect(() => {
    if (ls) {
      const storedCart = ls.getItem('cart');
      if (storedCart) {
        console.log('Initializing cartProducts from localStorage');
        setCartProducts(JSON.parse(storedCart));
      }
    }
  }, []); // Empty dependency array to run only once on mount

  // 2. Sync localStorage whenever cartProducts changes
  /*function addProduct(productId: string) {
    setCartProducts((prev) => {
      const existingProduct = prev.find(
        (item) => Object.keys(item)[0] === productId
      );
      if (existingProduct) {
        return prev.map((item) =>
          Object.keys(item)[0] === productId
            ? { [productId]: item[productId] + 1 }
            : item
        );
      }
      return [...prev, { [productId]: 1 }];
    });
  }

  function removeProduct(productId: string) {
    setCartProducts((prev) => {
      const existingProduct = prev.find(
        (item) => Object.keys(item)[0] === productId
      );
      if (existingProduct) {
        const newQuantity = existingProduct[productId] - 1;
        if (newQuantity <= 0) {
          return prev.filter((item) => Object.keys(item)[0] !== productId);
        }
        return prev.map((item) =>
          Object.keys(item)[0] === productId
            ? { [productId]: newQuantity }
            : item
        );
      }
      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }*/
  console.log('PRODUCTS :::::: IN CARTCOTNEXT PROVIDER', cartProducts);
  function addProduct(cartProduct: CartProduct) {
    console.log('Adding product:', cartProduct.SKU);
    setCartProducts((prev) => {
      const existingProductIndex = prev.findIndex(
        (product) => product.SKU === cartProduct.SKU
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prev];
        console.log(
          'OLD ITEM FOUND IN ADD PRODUCT',
          updatedProducts[existingProductIndex]
        );
        updatedProducts[existingProductIndex].quantity += 1;
        ls?.setItem('cart', JSON.stringify(updatedProducts));
        return updatedProducts;
      } else {
        const newCart = [...prev, cartProduct];
        ls?.setItem('cart', JSON.stringify(newCart));
        return newCart;
      }
    });
  }

  function removeProduct(SKU: string) {
    console.log('Removing product:', SKU);
    setCartProducts((prev) => {
      const existingProductIndex = prev.findIndex(
        (product) => product.SKU === SKU
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prev];
        const product = updatedProducts[existingProductIndex];

        if (product.quantity > 1) {
          // If more than one item exists, decrement its quantity
          product.quantity -= 1;
          ls?.setItem('cart', JSON.stringify(updatedProducts));
          return updatedProducts;
        } else {
          // If only one item exists, remove it from the cart
          const k = updatedProducts.filter((p) => p.SKU !== SKU);
          ls?.setItem('cart', JSON.stringify(k));
          return k;
        }
      }
      ls?.setItem('cart', JSON.stringify(prev));
      return prev;
    });
  }

  function removeWholeQuantity(SKU: string) {
    setCartProducts((prev) => {
      const updatedCart = prev.filter((product) => product.SKU !== SKU);
      console.log(updatedCart);

      // Update localStorage only once, after setting the state
      if (ls) {
        console.log('REMOVE FROM LS: ');
        ls.setItem('cart', JSON.stringify(updatedCart));
        //console.log('cart remaining: ', ls.getItem('cart'));
      }

      return updatedCart; // Return the updated cart state
    });
  }

  function clearCart() {
    console.log('Clearing cart');
    setCartProducts([]);
    if (ls) {
      ls.removeItem('cart');
    }
  }

  console.log('PRODUSE', cartProducts);
  // Calculate the total number of products in the cart
  const totalProducts = useMemo(() => {
    return cartProducts.reduce((acc, product) => acc + product.quantity, 0);
  }, [cartProducts]);

  const totalPrice = useMemo(() => {
    const total = cartProducts.reduce(
      (acc, product) => acc + Number(product.price) * product.quantity,
      0
    );

    // Format the total price using Intl.NumberFormat
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Change this to your desired currency code
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(total);
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        removeWholeQuantity,
        clearCart,
        totalProducts,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
