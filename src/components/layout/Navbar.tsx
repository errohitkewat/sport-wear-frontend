import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  User,
  X,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Men", path: "/men" },
  { label: "Women", path: "/women" },
  { label: "Kids", path: "/kids" },
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    <header className="sticky top-0 z-[70] border-b border-white/10 bg-black/70 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-sm font-black shadow-[0_0_30px_rgba(249,115,22,0.35)]">
            SW
          </div>

          <div className="leading-none">
            <h1 className="text-xl font-black uppercase tracking-[0.14em] text-white">
              SportWear
            </h1>
            <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-slate-400">
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
                className={`rounded-full px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-orange-500 !text-black"
                    : "!text-white hover:bg-white/10 hover:!text-orange-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated && user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-orange-500 hover:text-black"
                >
                  <LayoutDashboard size={16} />
                  Admin
                </Link>
              )}

              <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200">
                {user.name}
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-white/20 bg-white/5 p-2.5 text-slate-200 transition hover:bg-orange-500 hover:text-black"
            >
              <User size={22} />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative rounded-full border border-white/20 bg-white/5 p-2.5 text-slate-200 transition hover:bg-orange-500 hover:text-black"
          >
            <ShoppingBag size={22} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-black">
              {cartCount}
            </span>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-orange-500 hover:text-black lg:hidden"
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
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col border-l border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-[0.14em] text-white">
                    Menu
                  </h2>
                  <p className="text-sm text-slate-400">Browse the store</p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-orange-500 hover:text-black"
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
                        className={`mt-3 flex items-center justify-between rounded-full px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${
                          active
                            ? "bg-orange-500 !text-black"
                            : "!text-white hover:bg-white/10 hover:!text-orange-400"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={16} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                variants={bottomSectionVariants}
                className="mt-auto border-t border-white/10 px-5 py-5"
              >
                <div className="flex flex-col gap-3">
                  {isAuthenticated && user ? (
                    <>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-orange-500 hover:text-black"
                        >
                          <LayoutDashboard size={18} />
                          Admin Dashboard
                        </Link>
                      )}

                      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-slate-200">
                        {user.name}
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-orange-500 hover:text-black"
                    >
                      <User size={18} />
                      Account
                    </Link>
                  )}

                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="relative flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                  >
                    <ShoppingBag size={18} />
                    Cart
                    <span className="absolute right-3 top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
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
