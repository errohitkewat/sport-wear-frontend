import { motion } from "framer-motion";

type ShopFilterSidebarProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (value: string) => void;
};

export const categories = [
  "All",
  "T-Shirts",
  "Jerseys",
  "Tracksuits",
  "Gym Wear",
  "Hoodies",
  "Jackets",
];

export const genders = ["All", "Men", "Women", "Unisex"];

export const priceRanges = [
  "All",
  "Under ₹1000",
  "₹1000 - ₹1500",
  "₹1500 - ₹2000",
  "Above ₹2000",
];

const ShopFilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  selectedPriceRange,
  setSelectedPriceRange,
}: ShopFilterSidebarProps) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="hidden h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:block"
    >
      <div className="border-b border-slate-200 pb-6">
        <h3 className="text-lg font-bold text-slate-900">Filters</h3>
        <p className="mt-1 text-sm text-slate-500">
          Filter products by category, gender, and price
        </p>
      </div>

      <div className="pt-6">
        <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Category
        </h4>

        <div className="mt-4 flex flex-col gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Gender
        </h4>

        <div className="mt-4 flex flex-col gap-3">
          {genders.map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                selectedGender === gender
                  ? "bg-orange-500 text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Price
        </h4>

        <div className="mt-4 flex flex-col gap-3">
          {priceRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedPriceRange(range)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                selectedPriceRange === range
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default ShopFilterSidebar;
