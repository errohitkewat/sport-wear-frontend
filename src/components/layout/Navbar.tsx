import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  // Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Men", path: "/men" },
  { label: "Women", path: "/women" },
  { label: "Kids", path: "/kids" },
  // { label: "Accessories", path: "/accessories" },
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
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-extrabold text-white shadow-sm">
            SW
          </div>

          <div className="leading-none">
            <h1 className="text-xl font-extrabold uppercase tracking-wide text-slate-950">
              SportWear
            </h1>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">
              Move Better
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const active = isActivePath(link.path);

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-black hover:bg-slate-100 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {/* <button className="rounded-full p-2.5 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
            <Search size={20} />
          </button> */}

          {isAuthenticated && user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
                >
                  <LayoutDashboard size={16} />
                  Admin
                </Link>
              )}

              <div className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800">
                {user.name}
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full p-2.5 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <User size={25} />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative rounded-full p-2.5 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <ShoppingBag size={25} />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow-sm">
              {cartCount}
            </span>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
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
              className="ml-auto flex h-full w-[84%] max-w-sm flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">Menu</h2>
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
                {navLinks.map((link) => {
                  const active = isActivePath(link.path);

                  return (
                    <motion.div key={link.label} variants={navItemVariants}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block rounded-2xl px-4 py-4 text-sm font-semibold transition ${
                          active
                            ? "bg-slate-950 text-white!"
                            : "border-b border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-orange-500"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                variants={bottomSectionVariants}
                className="mt-auto border-t border-slate-200 px-5 py-5"
              >
                <div className="flex flex-col gap-3">
                  {isAuthenticated && user ? (
                    <>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                        >
                          <LayoutDashboard size={18} />
                          Admin Dashboard
                        </Link>
                      )}

                      <div className="rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-800">
                        {user.name}
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                    >
                      <User size={18} />
                      Account
                    </Link>
                  )}

                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="relative flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
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


