import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import type { ProductType } from "../../data/products";

const BASE_URL = "http://127.0.0.1:8000";

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
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              Best Sellers
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Trending Sportswear
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Clean, sporty, and performance-focused clothing for daily
              training, gym sessions, and active lifestyle.
            </p>
          </div>

          <Link
            to="/shop"
            className="w-fit rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View All Products
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-600">Loading trending products...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {trendingProducts.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link to={`/product/${product._id}`}>
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

                <div className="p-5">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="line-clamp-2 text-lg font-bold text-slate-900 transition hover:text-orange-500">
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

                  <button
                    onClick={() => addToCart(product, product.sizes[0], 1)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                  >
                    <ShoppingBag size={18} />
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              No trending products found
            </h3>
            <p className="mt-2 text-slate-600">
              Add trending products from admin dashboard to show them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProductsSection;
