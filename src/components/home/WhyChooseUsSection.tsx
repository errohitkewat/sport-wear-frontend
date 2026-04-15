import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Truck,
    title: "Fast Local Delivery",
    description:
      "Quick and reliable delivery so your customers get their sportswear without long waiting time.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "High-quality fabrics made for comfort, durability, movement, and everyday performance.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description:
      "Simple return and exchange process to create a smoother and more trusted shopping experience.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Always ready to help with product questions, sizing help, and order-related support.",
  },
];

const WhyChooseUsSection = () => {
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
            Why Choose Us
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built For Performance & Comfort
          </h2>

          <p className="mx-auto mt-4 max-w-8xl text-sm leading-7 text-slate-300 sm:text-base">
            Every piece is designed to deliver style, comfort, trust, and a
            better shopping experience for active lifestyles.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
                </div>

                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-black transition duration-300 group-hover:bg-white">
                  <Icon size={24} />
                </div>

                <h3 className="relative text-xl font-black uppercase tracking-tight text-white">
                  {feature.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-slate-300">
                  {feature.description}
                </p>

                <div className="relative mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                  <span>Trusted Feature</span>
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
