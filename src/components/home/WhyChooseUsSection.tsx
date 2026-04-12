import { ShieldCheck, Truck, RefreshCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Local Delivery",
    description:
      "Quick delivery across your city so customers get their sportswear without delay.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "High-quality fabrics designed for durability, comfort, and performance.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description:
      "Hassle-free return and exchange policy for a better shopping experience.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Always available to help customers with orders, sizes, and queries.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Built For Performance & Comfort
          </h2>
          <p className="mt-3 text-slate-600">
            Everything your sportswear store needs to build trust and deliver a
            great customer experience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition group-hover:bg-orange-500">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
