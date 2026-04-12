import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import type { ProductType } from "../data/products";

const BASE_URL = "http://127.0.0.1:8000";

const MenPage = () => {
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

  const menProducts = useMemo(() => {
    return products.filter((product) => product.gender === "Men");
  }, [products]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500"
          >
            Men Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl"
          >
            Men&apos;s Sportswear
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-4 max-w-2xl text-base leading-7 text-slate-600"
          >
            Explore premium men&apos;s activewear for training, gym, daily
            performance, and sporty everyday style.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-600">Loading products...</p>
            </div>
          ) : errorMessage ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-red-500">{errorMessage}</p>
            </div>
          ) : menProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {menProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                No men&apos;s products found
              </h2>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MenPage;
