import { motion } from "framer-motion";
import { Mail, Search, Shield, UserCheck, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import AdminLayout from "../layout/AdminLayout";


type UserStatus = "Active" | "Blocked";
type UserRole = "Customer" | "Admin";

type UserType = {
  id: string;
  name: string;
  email: string;
  city: string;
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
  status: UserStatus;
  role: UserRole;
};

const initialUsers: UserType[] = [
  {
    id: "USR-1001",
    name: "Rohit Sharma",
    email: "rohit@example.com",
    city: "Indore",
    joinedAt: "12 Apr 2026",
    totalOrders: 5,
    totalSpent: 5899,
    status: "Active",
    role: "Customer",
  },
  {
    id: "USR-1002",
    name: "Anjali Verma",
    email: "anjali@example.com",
    city: "Bhopal",
    joinedAt: "10 Apr 2026",
    totalOrders: 3,
    totalSpent: 3299,
    status: "Active",
    role: "Customer",
  },
  {
    id: "USR-1003",
    name: "Vikas Patel",
    email: "vikas@example.com",
    city: "Jabalpur",
    joinedAt: "08 Apr 2026",
    totalOrders: 2,
    totalSpent: 1799,
    status: "Blocked",
    role: "Customer",
  },
  {
    id: "USR-1004",
    name: "Store Admin",
    email: "admin@sportwear.com",
    city: "Satna",
    joinedAt: "01 Apr 2026",
    totalOrders: 0,
    totalSpent: 0,
    status: "Active",
    role: "Admin",
  },
];

const getStatusClasses = (status: UserStatus) => {
  return status === "Active"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.city.toLowerCase().includes(term),
    );
  }, [users, searchTerm]);

  const updateUserRole = (id: string, role: UserRole) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role } : user)),
    );
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user,
      ),
    );
  };

  return (
    <AdminLayout
      title="Manage Users"
      subtitle="View customers, update roles, and manage account status."
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
              placeholder="Search by name, email, or city..."
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
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    City
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {user.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <Mail size={13} />
                          {user.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {user.city}
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {user.joinedAt}
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {user.totalOrders}
                    </td>

                    <td className="px-6 py-5 text-sm font-bold text-slate-900">
                      ₹{user.totalSpent}
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          updateUserRole(user.id, e.target.value as UserRole)
                        }
                        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-900"
                      >
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClasses(
                          user.status,
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                          user.status === "Active"
                            ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                            : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        {user.status === "Active" ? (
                          <>
                            <UserX size={15} />
                            Block
                          </>
                        ) : (
                          <>
                            <UserCheck size={15} />
                            Activate
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-4 lg:hidden">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {user.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <Mail size={13} />
                      {user.email}
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${getStatusClasses(
                      user.status,
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">City</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {user.city}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">Joined</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {user.joinedAt}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">Orders</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {user.totalOrders}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs font-medium text-slate-500">Spent</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      ₹{user.totalSpent}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateUserRole(user.id, e.target.value as UserRole)
                    }
                    className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-900"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>

                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
                      user.status === "Active"
                        ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <>
                        <UserX size={15} />
                        Block
                      </>
                    ) : (
                      <>
                        <UserCheck size={15} />
                        Activate
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
                  <Shield size={13} />
                  {user.role}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-10 text-center">
              <h3 className="text-xl font-bold text-slate-900">
                No users found
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

export default AdminUsersPage;
