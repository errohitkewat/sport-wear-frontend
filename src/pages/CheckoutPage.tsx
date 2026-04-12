import { motion } from "framer-motion";
import { CreditCard, MapPin, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const BASE_URL = "http://127.0.0.1:8000";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartItems, cartCount, cartSubtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const deliveryFee = cartSubtotal >= 999 ? 0 : 50;
  const totalAmount = cartSubtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (!token) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        items: cartItems.map((item) => ({
          productId: String(item._id),
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
        })),
        shippingAddress: formData,
        paymentMethod,
        subtotal: cartSubtotal,
        deliveryFee,
        totalAmount,
      };

      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();
      navigate("/order-success");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500"
          >
            Checkout
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl"
          >
            Complete Your Order
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-4 max-w-2xl text-base leading-7 text-slate-600"
          >
            Enter your shipping details and choose a payment method to place
            your order.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                  <MapPin size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Shipping Details
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter delivery information
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Optional landmark"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                  <CreditCard size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Payment Method
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose how you want to pay
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-3xl border p-5 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    UPI Payment
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Pay instantly using your UPI app.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-3xl border p-5 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    Cash on Delivery
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Pay when your order reaches you.
                  </p>
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                <ShoppingBag size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Order Summary
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review your order details
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedSize}`}
                  className="flex gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                    <p className="mt-2 text-sm font-extrabold text-slate-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
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
                <span className="inline-flex items-center gap-2">
                  <Truck size={16} />
                  Delivery
                </span>
                <span className="font-semibold text-slate-900">
                  {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-slate-900">
                    Total
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="mt-4 text-sm font-medium text-red-500">
                {errorMessage}
              </p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
              className="mt-6 w-full rounded-full bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
