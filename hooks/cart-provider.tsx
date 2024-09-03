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
  useEffect(() => {
    /*console.log(
      'CART PORDUCTS: ',
      cartProducts,
      Object.keys(cartProducts).length
    );
    if (Object.keys(cartProducts).length > 0)*/
    if (cartProducts.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      ls.getItem('cart');
      setCartProducts(JSON.parse(ls.getItem('cart') || ''));
    }
  }, [ls]);
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
  function addProduct(cartProduct: CartProduct) {
    console.log('Adding product:', cartProduct.SKU);
    setCartProducts((prev) => {
      const existingProductIndex = prev.findIndex(
        (product) => product.SKU === cartProduct.SKU
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prev];
        updatedProducts[existingProductIndex].quantity += 1;
        return updatedProducts;
      } else {
        return [...prev, cartProduct];
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
          return updatedProducts;
        } else {
          // If only one item exists, remove it from the cart
          return updatedProducts.filter((p) => p.SKU !== SKU);
        }
      }
      return prev;
    });
  }

  function removeWholeQuantity(SKU: string) {
    setCartProducts((prev) => {
      const updatedCart = prev.filter((product) => product.SKU !== SKU);
      if (ls) {
        ls.setItem('cart', JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  }

  function clearCart() {
    console.log('Clearing cart');
    setCartProducts([]);
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
