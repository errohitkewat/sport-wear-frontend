import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const BASE_URL = "http://localhost:8000";

type CategoryType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  isActive: boolean;
};

const CategorySection = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(`${BASE_URL}/api/categories`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch categories");
        }

        setCategories(data.categories || []);
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

    fetchCategories();
  }, []);

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
          className="mb-14 "
        >
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
            Categories
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Shop By Category
          </h2>

          <p className="mx-auto mt-4 max-w-8xl text-sm leading-7 text-slate-300 sm:text-base">
            Explore premium sportswear collections designed for performance,
            confidence, and everyday style.
          </p>
        </motion.div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
            <p className="text-slate-300">Loading categories...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">
            <p className="text-red-400">{errorMessage}</p>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
              >
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/10" />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-400 backdrop-blur-md">
                      Collection
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                      {category.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
                      {category.description || "Explore collection"}
                    </p>

                    <Link
                      to={`/shop?category=${encodeURIComponent(category.title)}`}
                      className="mt-5 inline-flex items-center gap-3 rounded-full bg-orange-500 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.18em]  text-black transition hover:bg-orange-600 "
                    >
                      Explore Now
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                        <ChevronRight size={16} />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
            <h3 className="text-xl font-bold text-white">
              No categories found
            </h3>
            <p className="mt-2 text-slate-400">
              Add categories from the admin dashboard.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
