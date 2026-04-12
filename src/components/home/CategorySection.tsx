import { Link } from "react-router-dom";

const categories = [
  {
    title: "T-Shirts",
    subtitle: "Lightweight & breathable",
    image:
      "https://images.unsplash.com/photo-1520975693419-0a4c0b9d1f7d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Tracksuits",
    subtitle: "Comfort meets performance",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Jerseys",
    subtitle: "Play like a pro",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Gym Wear",
    subtitle: "Train with confidence",
    image:
      "https://images.unsplash.com/photo-1594737625785-cb6c87d3c7f5?auto=format&fit=crop&w=800&q=80",
  },
];

const CategorySection = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
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
                <p className="text-sm text-slate-200">{category.subtitle}</p>
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
      </div>
    </section>
  );
};

export default CategorySection;
