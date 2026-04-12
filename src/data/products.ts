export type ProductType = {
  _id: string;
  name: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  price: number;
  oldPrice?: number | null;
  image: string;
  description?: string;
  isNew?: boolean;
  isTrending?: boolean;
  sizes: string[];
  stock: number;
  isActive: boolean;
};