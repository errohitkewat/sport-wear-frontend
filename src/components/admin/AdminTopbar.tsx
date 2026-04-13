import { Bell, Menu, Search } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

type AdminTopbarProps = {
  title: string;
  subtitle: string;
  onMenuClick: () => void;
};

const AdminTopbar = ({ title, subtitle, onMenuClick }: AdminTopbarProps) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* ✅ Back Button */}
          {isAdminPage && (
            <Link
              to="/"
              className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              ← Back to Website
            </Link>
          )}

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-slate-300 bg-white py-2 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900 sm:w-[260px]"
            />
          </div>

          <button className="relative rounded-full border border-slate-300 bg-white p-3 text-slate-700 transition hover:bg-slate-100">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-slate-300 bg-white px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              A
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Store Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
