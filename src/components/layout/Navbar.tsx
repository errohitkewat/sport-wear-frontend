import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Men", path: "/men" },
  { label: "Women", path: "/women" },
  { label: "Accessories", path: "/accessories" },
  { label: "Contact", path: "/contact" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.24,
      ease: "easeIn",
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

const bottomSectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 transition-all duration-300 ${
        isOpen ? "bg-white shadow-sm" : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            SW
          </div>
          <div>
            <h1 className="text-lg font-extrabold uppercase tracking-wide text-slate-900">
              SportWear
            </h1>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Move Better
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm font-semibold text-slate-700 transition hover:text-orange-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
            <Search size={20} />
          </button>

          {isAuthenticated && user ? (
            <>
              <div className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
                {user.name}
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <User size={20} />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ShoppingBag size={20} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-[82%] max-w-sm flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Menu</h2>
                  <p className="text-sm text-slate-500">Browse the store</p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col px-5 py-4">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={navItemVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block border-b border-slate-200 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-orange-500"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={bottomSectionVariants}
                className="mt-auto border-t border-slate-200 px-5 py-5"
              >
                <div className="flex flex-col gap-3">
                  {isAuthenticated && user ? (
                    <>
                      <div className="rounded-full border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800">
                        {user.name}
                      </div>

                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                    >
                      <User size={18} />
                      Account
                    </Link>
                  )}

                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="relative flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <ShoppingBag size={18} />
                    Cart
                    <span className="absolute right-3 top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
