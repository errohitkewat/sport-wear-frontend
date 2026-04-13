import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type AdminSidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Hero Section",
    path: "/admin/hero",
  },
  {
  label: "Categories",
  path: "/admin/categories",
},
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <>
      <div className="hidden w-[280px] flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-extrabold text-slate-900">SportWear</h2>
          <p className="mt-1 text-sm text-slate-500">Admin Dashboard</p>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-2">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-2  text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {Icon && <Icon size={18} />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="h-full w-[82%] max-w-xs bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  SportWear
                </h2>
                <p className="text-sm text-slate-500">Admin Dashboard</p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {adminLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {Icon && <Icon size={18} />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
