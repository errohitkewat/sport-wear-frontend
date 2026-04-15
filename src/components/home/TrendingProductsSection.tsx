import { Heart, ShoppingBag, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import type { ProductType } from "../../data/products";

const BASE_URL = "http://localhost:8000";

const TrendingProductsSection = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.products || []);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const trendingProducts = useMemo(() => {
    return products.filter((product) => product.isTrending).slice(0, 4);
  }, [products]);

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b0b] to-black" />

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
              Best Sellers
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trending Sportswear
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Clean, bold, and performance-driven pieces built for training,
              movement, and everyday street-ready style.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-orange-500 hover:text-black"
          >
            View All
            <ChevronRight size={18} />
          </Link>
        </motion.div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
            <p className="text-slate-300">Loading trending products...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">
            <p className="text-red-400">{errorMessage}</p>
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm transition duration-300 hover:-translate-y-2"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      {product.isLatest && (
                        <span className="rounded-full bg-orange-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-black">
                          New
                        </span>
                      )}

                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        {product.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:bg-orange-500 hover:text-black"
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                </Link>

                <div className="p-5">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="line-clamp-2 text-lg font-black uppercase tracking-tight text-white transition hover:text-orange-500">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-2xl font-black text-white">
                      ₹{product.price}
                    </span>

                    {product.oldPrice && (
                      <span className="text-sm font-medium text-slate-400 line-through">
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, product.sizes[0], 1)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-black transition hover:bg-white"
                  >
                    <ShoppingBag size={18} />
                    Add To Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
            <h3 className="text-xl font-bold text-white">
              No trending products found
            </h3>
            <p className="mt-2 text-slate-400">
              Add trending products from admin dashboard to show them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProductsSection;
