import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const PromoBannerSection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white">
      {/* grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b0b] to-black" />

      <div className="relative mx-auto grid max-w-8xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* LEFT - MAIN PROMO */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-orange-500 to-orange-600 p-8 md:p-10"
        >
          {/* glow */}
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />

          <p className="text-sm font-bold uppercase tracking-[0.35em] text-white/80">
            Limited Offer
          </p>

          <h2 className="mt-5 max-w-md text-3xl font-black uppercase leading-tight md:text-4xl lg:text-5xl">
            Upgrade Your Sportswear Collection
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-white/90 md:text-base">
            Premium activewear designed for performance, movement, and everyday
            confidence. Built for athletes and street-ready style.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
          >
            Shop Now
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-black">
              <ChevronRight size={18} />
            </span>
          </Link>
        </motion.div>

        {/* RIGHT - SECOND PROMO */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10"
        >
          {/* hover glow */}
          <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-orange-500/20 blur-3xl" />
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-400">
            New Arrival
          </p>

          <h2 className="mt-5 max-w-md text-3xl font-black uppercase leading-tight md:text-4xl lg:text-5xl">
            Fresh Fits For Every Workout
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 md:text-base">
            Discover training essentials, modern fits, and performance gear that
            keeps you comfortable while looking sharp all day.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-orange-500 hover:text-black"
          >
            Explore
            <ChevronRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBannerSection;
