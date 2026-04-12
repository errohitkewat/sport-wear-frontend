import type { ProductType } from "../data/products";

export type CartItem = ProductType & {
  selectedSize: string;
  quantity: number;
};