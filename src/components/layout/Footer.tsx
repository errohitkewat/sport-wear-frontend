import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-8xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Left Div */}
          <div className="inline-block w-fit">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-sm font-extrabold text-white">
                SW
              </div>

              <div>
                <h2 className="text-lg font-extrabold uppercase tracking-wide">
                  SportWear
                </h2>
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                  Move Better
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Modern sports clothing store with clean style, premium quality,
              and comfortable activewear for daily performance.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-orange-500 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-orange-500 hover:text-white"
              >
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Right Div */}
          <div className="flex-1 lg:pl-40">
            <div className="flex flex-wrap justify-between gap-8">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wide text-white">
                  Quick Links
                </h3>

                <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                  <Link to="/" className="transition hover:text-orange-400">
                    Home
                  </Link>
                  <Link to="/shop" className="transition hover:text-orange-400">
                    Shop
                  </Link>
                  <Link to="/men" className="transition hover:text-orange-400">
                    Men
                  </Link>
                  <Link
                    to="/women"
                    className="transition hover:text-orange-400"
                  >
                    Women
                  </Link>
                  <Link
                    to="/contact"
                    className="transition hover:text-orange-400"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold uppercase tracking-wide text-white">
                  Categories
                </h3>

                <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                  <Link
                    to="/shop?category=T-Shirts"
                    className="transition hover:text-orange-400"
                  >
                    T-Shirts
                  </Link>
                  <Link
                    to="/shop?category=Jerseys"
                    className="transition hover:text-orange-400"
                  >
                    Jerseys
                  </Link>
                  <Link
                    to="/shop?category=Tracksuits"
                    className="transition hover:text-orange-400"
                  >
                    Tracksuits
                  </Link>
                  <Link
                    to="/shop?category=Hoodies"
                    className="transition hover:text-orange-400"
                  >
                    Hoodies
                  </Link>
                  <Link
                    to="/shop?category=Gym Wear"
                    className="transition hover:text-orange-400"
                  >
                    Gym Wear
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold uppercase tracking-wide text-white">
                  Contact
                </h3>

                <div className="mt-5 space-y-4 text-sm text-slate-400">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 text-orange-400" />
                    <p>Your City, Your Store Address</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="mt-0.5 text-orange-400" />
                    <p>+91 98765 43210</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 text-orange-400" />
                    <p>sportwearstore@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <p>© 2026 SportWear. All rights reserved.</p>
          <p>Designed for a modern local sports clothing store.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
