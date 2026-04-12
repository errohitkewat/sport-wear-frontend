import { motion } from "framer-motion";
import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import AdminLayout from "../layout/AdminLayout";


const stats = [
  {
    title: "Total Products",
    value: "128",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Orders",
    value: "342",
    icon: ShoppingCart,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Total Users",
    value: "1,245",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Revenue",
    value: "₹58,400",
    icon: DollarSign,
    color: "bg-purple-100 text-purple-600",
  },
];

const AdminDashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Manage products, orders, users, and store performance."
    >
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
                      {stat.value}
                    </h3>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Store Performance
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                  Sales Summary
                </h2>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                <TrendingUp size={16} />
                +18.2%
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Today Sales</p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                  ₹4,820
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">This Week</p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                  ₹18,450
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">This Month</p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                  ₹58,400
                </h3>
              </div>
            </div>

            <div className="mt-8 h-72 rounded-3xl bg-slate-100 p-6">
              <div className="flex h-full items-center justify-center text-center text-slate-500">
                Chart area for monthly sales analytics
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Recent Activity
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              Latest Updates
            </h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-slate-900">
                  New product added
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Flex Pro Tracksuit was added successfully.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-slate-900">
                  New order received
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Order #SW204 placed by a customer.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Low stock alert
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Dry Move Sports Jersey is running low.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-slate-900">
                  User registered
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  A new customer account was created today.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
