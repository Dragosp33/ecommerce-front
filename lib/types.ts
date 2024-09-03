export interface CartProduct {
  title: string;
  SKU: string;
  price: string | number;
  quantity: number;
  thumbnail: string;
}

export interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
  removeWholeQuantity: (productId: string) => void;
  clearCart: () => void;
  totalProducts: number;
  totalPrice: string;
}
