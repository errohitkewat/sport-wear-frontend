import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

type HeroType = {
  image: string;
  titleLeft: string;
  titleRight: string;
};

const HeroSection = () => {
  const [hero, setHero] = useState<HeroType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hero`);
        const data = await response.json();

        if (response.ok && data.hero) {
          setHero(data.hero);
        }
      } catch (error) {
        console.error("Failed to fetch hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  // if (loading) {
  //   return (
  //     <section className="flex h-[78vh] min-h-[620px] items-center justify-center bg-black text-white">
  //       <p>Loading hero...</p>
  //     </section>
  //   );
  // }

  return (
    <section className="relative bg-white">
      <div className="relative h-[78vh] min-h-[620px] w-full overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80"
          alt="Sportwear hero background"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/70" />

        <div className="absolute inset-0 flex flex-col justify-evenly opacity-20">
          <div className="h-px w-full bg-white" />
          <div className="h-px w-full bg-white" />
          <div className="h-px w-full bg-white" />
          <div className="h-px w-full bg-white" />
        </div>

        <div className="relative mx-auto flex h-full max-w-400 items-center px-4 sm:px-6 lg:px-10">
          <div className="grid w-full items-center gap-8 lg:grid-cols-3">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="z-10"
            >
              <p className="text-[34px]  font-black uppercase leading-none tracking-tight text-white sm:text-[50px] lg:text-[72px]">
                {hero?.titleLeft || "New"}
              </p>

              <div className="mt-2 inline-block border-2 border-orange-500 px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-[44px] font-black uppercase leading-none tracking-tight text-white sm:text-[64px] lg:text-[110px]">
                  Sport
                </p>
              </div>

              <p className="mt-4 max-w-md text-xs font-medium uppercase tracking-[0.2em] text-slate-300 sm:text-sm">
                Premium activewear for style, comfort, and every move
              </p>
            </motion.div>

            {/* Center image from admin */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="relative flex items-end justify-center h-full"
            >
              <div className="relative h-[78vh]  min-h-[620px] w-full max-w-[460px]">
                <img
                  src={
                    hero?.image ||
                    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
                  }
                  alt="Sportwear model"
                  className="absolute bottom-0 left-1/2 h-full w-auto -translate-x-1/2 object-contain"
                />
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="z-10 flex flex-col items-start lg:items-end"
            >
              <h2 className="text-left text-[34px] font-black uppercase leading-[0.92] tracking-tight text-white sm:text-[52px] lg:text-[92px] lg:text-right">
                {hero?.titleRight || "Your Style"}
              </h2>

              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition hover:bg-white hover:text-white"
              >
                Shop Now
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                  <ChevronRight size={18} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 flex items-center gap-3 sm:right-10">
          <span className="h-3 w-3 rounded-full bg-white" />
          <span className="h-3 w-3 rounded-full bg-white/50" />
          <span className="h-3 w-3 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
