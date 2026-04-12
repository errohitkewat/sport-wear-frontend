import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import {
  categories,
  genders,
  priceRanges,
} from "../components/shop/ShopFilterSidebar";

const BASE_URL = "http://127.0.0.1:8000";

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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 20 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const ShopPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const filteredProducts = useMemo(() => {
    let updatedProducts = products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;

      const genderMatch =
        selectedGender === "All" || product.gender === selectedGender;

      const priceMatch =
        selectedPriceRange === "All" ||
        (selectedPriceRange === "Under ₹1000" && product.price < 1000) ||
        (selectedPriceRange === "₹1000 - ₹1500" &&
          product.price >= 1000 &&
          product.price <= 1500) ||
        (selectedPriceRange === "₹1500 - ₹2000" &&
          product.price > 1500 &&
          product.price <= 2000) ||
        (selectedPriceRange === "Above ₹2000" && product.price > 2000);

      const searchMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return categoryMatch && genderMatch && priceMatch && searchMatch;
    });

    if (sortValue === "price-low-high") {
      updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price-high-low") {
      updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
    }

    if (sortValue === "newest") {
      updatedProducts = [...updatedProducts].sort((a, b) => {
        if (!!a.isNew === !!b.isNew) return 0;
        return a.isNew ? -1 : 1;
      });
    }

    return updatedProducts;
  }, [
    products,
    selectedCategory,
    selectedGender,
    selectedPriceRange,
    searchTerm,
    sortValue,
  ]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedGender !== "All" ||
    selectedPriceRange !== "All";

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedGender("All");
    setSelectedPriceRange("All");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500"
          >
            Shop Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl"
          >
            Performance Sportswear
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl text-base leading-7 text-slate-600"
          >
            Explore premium sports clothing for training, gym, running, and
            active daily wear. Clean style, comfortable fabric, and modern fit.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedCategory === "All"
                    ? "All Products"
                    : selectedCategory}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedGender === "All"
                    ? "All genders"
                    : `${selectedGender} collection`}
                  {selectedPriceRange !== "All" && ` • ${selectedPriceRange}`}
                </p>
              </div>

              <p className="text-sm font-medium text-slate-500">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search sportswear..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                />
              </div>

              <select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
                className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-900"
              >
                <option value="default">Sort By</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  <SlidersHorizontal size={18} />
                  Choose Filters
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {(hasActiveFilters || searchTerm) && (
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "All" && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <span>{selectedCategory}</span>
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="text-slate-400 transition hover:text-slate-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {selectedGender !== "All" && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <span>{selectedGender}</span>
                    <button
                      onClick={() => setSelectedGender("All")}
                      className="text-slate-400 transition hover:text-slate-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {selectedPriceRange !== "All" && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <span>{selectedPriceRange}</span>
                    <button
                      onClick={() => setSelectedPriceRange("All")}
                      className="text-slate-400 transition hover:text-slate-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {searchTerm && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <span>{searchTerm}</span>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-slate-400 transition hover:text-slate-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-600">Loading products...</p>
            </div>
          ) : errorMessage ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-red-500">{errorMessage}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product as any} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-xl font-bold text-slate-900">
                No products found
              </h3>
              <p className="mt-2 text-slate-600">
                Try changing search, category, gender, or price filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-40 bg-black/45"
            />

            <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Filters
                    </h3>
                    <p className="text-sm text-slate-500">
                      Refine your product search
                    </p>
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto px-5 py-5 sm:px-6">
                  <div className="grid gap-8 md:grid-cols-3">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                        Category
                      </h4>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                              selectedCategory === category
                                ? "bg-slate-900 text-white"
                                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                        Gender
                      </h4>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {genders.map((gender) => (
                          <button
                            key={gender}
                            onClick={() => setSelectedGender(gender)}
                            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                              selectedGender === gender
                                ? "bg-orange-500 text-white"
                                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                        Price
                      </h4>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {priceRanges.map((range) => (
                          <button
                            key={range}
                            onClick={() => setSelectedPriceRange(range)}
                            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                              selectedPriceRange === range
                                ? "bg-slate-900 text-white"
                                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <div className="mt-8">
                      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                        Selected Filters
                      </h4>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedCategory !== "All" && (
                          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                            {selectedCategory}
                          </span>
                        )}

                        {selectedGender !== "All" && (
                          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                            {selectedGender}
                          </span>
                        )}

                        {selectedPriceRange !== "All" && (
                          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                            {selectedPriceRange}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={clearAllFilters}
                      className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Clear Filters
                    </button>

                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                    >
                      View Products
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default ShopPage;
