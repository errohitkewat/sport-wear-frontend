import { motion } from "framer-motion";
import { Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";
import AdminLayout from "../layout/AdminLayout";


type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
type PaymentStatus = "Paid" | "Pending" | "Failed";

type OrderType = {
  id: string;
  customerName: string;
  customerEmail: string;
  city: string;
  items: number;
  total: number;
  date: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
};

const initialOrders: OrderType[] = [
  {
    id: "SW-1001",
    customerName: "Rohit Sharma",
    customerEmail: "rohit@example.com",
    city: "Indore",
    items: 3,
    total: 2899,
    date: "12 Apr 2026",
    orderStatus: "Pending",
    paymentStatus: "Paid",
  },
  {
    id: "SW-1002",
    customerName: "Anjali Verma",
    customerEmail: "anjali@example.com",
    city: "Bhopal",
    items: 2,
    total: 1799,
    date: "11 Apr 2026",
    orderStatus: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "SW-1003",
    customerName: "Vikas Patel",
    customerEmail: "vikas@example.com",
    city: "Jabalpur",
    items: 1,
    total: 899,
    date: "10 Apr 2026",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
  {
    id: "SW-1004",
    customerName: "Sneha Singh",
    customerEmail: "sneha@example.com",
    city: "Satna",
    items: 4,
    total: 4599,
    date: "09 Apr 2026",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "SW-1005",
    customerName: "Aman Tiwari",
    customerEmail: "aman@example.com",
    city: "Rewa",
    items: 2,
    total: 1499,
    date: "08 Apr 2026",
    orderStatus: "Cancelled",
    paymentStatus: "Pending",
  },
];

const getOrderStatusClasses = (status: OrderStatus) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Shipped":
      return "bg-purple-100 text-purple-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const getPaymentStatusClasses = (status: PaymentStatus) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const orderStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.customerEmail.toLowerCase().includes(term),
    );
  }, [orders, searchTerm]);

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, orderStatus: newStatus } : order,
      ),
    );
  };

  return (
    <AdminLayout
      title="Manage Orders"
      subtitle="View customer orders and update their status."
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by order id, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    City
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Order Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-6 py-5 text-sm font-bold text-slate-900">
                      {order.id}
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {order.customerName}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {order.city}
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {order.items}
                    </td>

                    <td className="px-6 py-5 text-sm font-bold text-slate-900">
                      ₹{order.total}
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {order.date}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getPaymentStatusClasses(
                          order.paymentStatus,
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getOrderStatusClasses(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value as OrderStatus,
                            )
                          }
                          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-900"
                        >
                          {orderStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                          <Eye size={15} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-4 lg:hidden">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {order.id}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {order.customerName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {order.customerEmail}
                    </p>
                  </div>

                  <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    <Eye size={15} />
                    View
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">City</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {order.city}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">Items</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {order.items}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">Total</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      ₹{order.total}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">Date</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {order.date}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getPaymentStatusClasses(
                      order.paymentStatus,
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getOrderStatusClasses(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="mt-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value as OrderStatus)
                    }
                    className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-900"
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-10 text-center">
              <h3 className="text-xl font-bold text-slate-900">
                No orders found
              </h3>
              <p className="mt-2 text-slate-600">
                Try a different search term.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
