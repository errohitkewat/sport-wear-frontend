import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
  } = useCart();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Your Cart
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Shopping Cart
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Review your selected sportswear products before checkout.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <ShoppingBag size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Your cart is empty
              </h2>

              <p className="mt-3 text-slate-600">
                Add products to your cart and come back here.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item._id}-${item.selectedSize}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full rounded-2xl object-cover sm:w-32"
                      />

                      <div className="flex flex-1 flex-col justify-between gap-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.category} • {item.gender}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-slate-700">
                              Size: {item.selectedSize}
                            </p>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-lg font-extrabold text-slate-900">
                              ₹{item.price * item.quantity}
                            </p>
                            <p className="text-sm text-slate-500">
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="inline-flex items-center rounded-full border border-slate-300 bg-white">
                            <button
                              onClick={() =>
                                decreaseQuantity(item._id, item.selectedSize)
                              }
                              className="rounded-l-full px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                            >
                              <Minus size={18} />
                            </button>

                            <span className="min-w-[50px] text-center text-sm font-bold text-slate-900">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQuantity(item._id, item.selectedSize)
                              }
                              className="rounded-r-full px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                            >
                              <Plus size={18} />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              removeFromCart(item._id, item.selectedSize)
                            }
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <button
                  onClick={clearCart}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Clear Cart
                </button>
              </div>

              <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Total Items</span>
                    <span className="font-semibold text-slate-900">
                      {cartCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      ₹{cartSubtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-slate-900">
                        Total
                      </span>
                      <span className="text-2xl font-extrabold text-slate-900">
                        ₹{cartSubtotal}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  Proceed To Checkout
                </Link>

                <Link
                  to="/shop"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CartPage;
