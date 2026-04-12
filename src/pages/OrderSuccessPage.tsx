import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const OrderSuccessPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="flex min-h-[70vh] items-center py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={40} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              Order Placed
            </p>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Your order was placed successfully
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Thank you for shopping with us. Your order has been received and
              will be processed soon. You can track your orders from your orders
              page.
            </p>

            <div className="mt-8 rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Order ID</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                SW-ORDER-2026
              </h2>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/my-orders"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                View My Orders
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OrderSuccessPage;
