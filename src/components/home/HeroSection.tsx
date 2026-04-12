import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80"
          alt="Sportswear hero"
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/40" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
            New Season Collection
          </p>

          <h1 className="text-4xl font-extrabold uppercase leading-tight sm:text-5xl lg:text-7xl">
            Gear Up
            <br />
            Play Hard
            <br />
            Stay Ahead
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Discover premium sportswear built for comfort, motion, and style.
            From training fits to everyday active essentials, everything is
            designed to keep you moving.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              Shop Collection
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Play size={16} />
              Explore Style
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <h3 className="text-2xl font-extrabold text-white">1k+</h3>
              <p className="mt-1 text-sm text-slate-300">Happy Customers</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <h3 className="text-2xl font-extrabold text-white">250+</h3>
              <p className="mt-1 text-sm text-slate-300">Premium Products</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <h3 className="text-2xl font-extrabold text-white">24/7</h3>
              <p className="mt-1 text-sm text-slate-300">Easy Support</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:justify-end">
          <div className="relative w-full max-w-md">
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                alt="Trending sportswear"
                className="h-[500px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div className="absolute -left-14 bottom-8 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 shadow-xl backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                Trending
              </p>
              <h4 className="mt-2 text-lg font-bold text-white">
                Performance Wear
              </h4>
              <p className="mt-1 text-sm text-slate-300">
                Built for comfort and movement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
