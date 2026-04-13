import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

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
    <section className="bg-white py-16">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Categories
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Shop By Category
          </h2>
          <p className="mt-3 text-slate-600">
            Explore premium sports clothing designed for performance and style
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-600">Loading categories...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-lg font-bold text-white">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-200">
                    {category.description || "Explore collection"}
                  </p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <Link
                    to={`/shop?category=${encodeURIComponent(category.title)}`}
                    className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-lg"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              No categories found
            </h3>
            <p className="mt-2 text-slate-600">
              Add categories from admin dashboard.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
