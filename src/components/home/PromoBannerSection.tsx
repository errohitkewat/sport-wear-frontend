import { Link } from "react-router-dom";

const PromoBannerSection = () => {
  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="mx-auto grid max-w-8xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 to-orange-600 p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            Limited Offer
          </p>

          <h2 className="mt-4 max-w-md text-3xl font-extrabold uppercase leading-tight md:text-4xl">
            Upgrade Your Sportswear Collection
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 md:text-base">
            Discover modern activewear made for training, comfort, and style.
            Perfect for gym, running, and everyday movement.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition border-slate-900 hover:bg-transparent border-2 hover:border-slate-900"
          >
            Shop Now
          </Link>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            New Arrival
          </p>

          <h2 className="mt-4 max-w-md text-3xl font-extrabold uppercase leading-tight md:text-4xl">
            Fresh Fits For Every Workout
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 md:text-base">
            From training tees to tracksuits and performance jerseys, explore
            styles that look sporty and feel comfortable all day.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerSection;
