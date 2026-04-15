import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#050505]" />

      <div className="relative mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-black shadow-[0_0_30px_rgba(249,115,22,0.35)]">
                SW
              </div>

              <div>
                <h2 className="text-xl font-black uppercase tracking-[0.16em] text-white">
                  SportWear
                </h2>
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                  Move Better
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Modern sportswear built with premium quality, bold style, and all
              day comfort for training, movement, and active living.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-sm transition hover:bg-orange-500 hover:text-black"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-sm transition hover:bg-orange-500 hover:text-black"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">
                Quick Links
              </h3>

              <div className="mt-6 flex flex-col gap-4 text-sm text-slate-400">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Shop
                </Link>
                <Link
                  to="/men"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Men
                </Link>
                <Link
                  to="/women"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Women
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Contact
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">
                Categories
              </h3>

              <div className="mt-6 flex flex-col gap-4 text-sm text-slate-400">
                <Link
                  to="/shop?category=T-Shirts"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  T-Shirts
                </Link>
                <Link
                  to="/shop?category=Jerseys"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Jerseys
                </Link>
                <Link
                  to="/shop?category=Tracksuits"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Tracksuits
                </Link>
                <Link
                  to="/shop?category=Hoodies"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Hoodies
                </Link>
                <Link
                  to="/shop?category=Gym Wear"
                  className="group inline-flex items-center gap-2 transition hover:text-orange-400"
                >
                  <ChevronRight
                    size={14}
                    className="text-orange-500 transition group-hover:translate-x-1"
                  />
                  Gym Wear
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">
                Contact
              </h3>

              <div className="mt-6 space-y-5 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-orange-400">
                    <MapPin size={16} />
                  </div>
                  <p className="leading-6">Your City, Your Store Address</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-orange-400">
                    <Phone size={16} />
                  </div>
                  <p className="leading-6">+91 98765 43210</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-orange-400">
                    <Mail size={16} />
                  </div>
                  <p className="leading-6">sportwearstore@gmail.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <p>© 2026 SportWear. All rights reserved.</p>
          <p>Designed for a modern sportswear shopping experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
