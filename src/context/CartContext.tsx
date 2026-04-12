import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductType } from "../data/products";
import type { CartItem } from "../types/cart";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (
    product: ProductType,
    selectedSize: string,
    quantity?: number,
  ) => void;
  removeFromCart: (productId: number, selectedSize: string) => void;
  increaseQuantity: (productId: number, selectedSize: string) => void;
  decreaseQuantity: (productId: number, selectedSize: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const CART_STORAGE_KEY = "sportswear_cart";

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (
    product: ProductType,
    selectedSize: string,
    quantity: number = 1,
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item._id === product._id && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { ...product, selectedSize, quantity }];
    });
  };

  const removeFromCart = (productId: number, selectedSize: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item._id === productId && item.selectedSize === selectedSize),
      ),
    );
  };

  const increaseQuantity = (productId: number, selectedSize: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number, selectedSize: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === productId && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
