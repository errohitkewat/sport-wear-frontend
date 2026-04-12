import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type ProductType = {
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

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            {product.isNew && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                New
              </span>
            )}

            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm">
              {product.category}
            </span>
          </div>

          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm transition hover:bg-slate-900 hover:text-white"
          >
            <Heart size={18} />
          </button>
        </div>
      </Link>

      <div className="p-5 flex flex-col justify-between">
        <p className="text-sm font-medium text-slate-500">{product.gender}</p>

        <Link to={`/product/${product._id}`}>
          <h3 className="mt-1 line-clamp-2 text-lg font-bold text-slate-900 transition hover:text-orange-500">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-extrabold text-slate-900">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-sm font-medium text-slate-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {size}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-3 ">
          <button
            onClick={() => addToCart(product as any, product.sizes[0], 1)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            <ShoppingBag size={18} />
            Add To Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
