import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useCart } from "../context/CartContext";
import type { ProductType } from "../data/products";

const BASE_URL = "http://127.0.0.1:8000";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductAndProducts = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const [productResponse, productsResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/products/${id}`),
          fetch(`${BASE_URL}/api/products`),
        ]);

        const productData = await productResponse.json();
        const productsData = await productsResponse.json();

        if (!productResponse.ok) {
          throw new Error(productData.message || "Failed to fetch product");
        }

        if (!productsResponse.ok) {
          throw new Error(productsData.message || "Failed to fetch products");
        }

        const fetchedProduct = productData.product as ProductType;

        setProduct(fetchedProduct);
        setAllProducts(productsData.products || []);
        setSelectedSize(fetchedProduct?.sizes?.[0] || "M");
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

    if (id) {
      fetchProductAndProducts();
    }
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return allProducts
      .filter(
        (item) =>
          item.category === product.category && item._id !== product._id,
      )
      .slice(0, 3);
  }, [product, allProducts]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <section className="px-4 py-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-600">Loading product...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (errorMessage || !product) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <section className="px-4 py-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900">
              Product not found
            </h1>

            <p className="mt-3 text-slate-600">
              {errorMessage ||
                "The product you are looking for does not exist."}
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Back To Shop
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="transition hover:text-orange-500">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="transition hover:text-orange-500">
              Shop
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-700">{product.name}</span>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full rounded-[1.5rem] object-cover sm:h-[520px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="flex flex-wrap items-center gap-3">
              {product.isNew && (
                <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  New Arrival
                </span>
              )}

              <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                {product.category}
              </span>

              <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                {product.gender}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-1 text-orange-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span>(4.9 rating)</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-extrabold text-slate-900">
                ₹{product.price}
              </span>

              {product.oldPrice && (
                <span className="text-lg font-medium text-slate-400 line-through">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              {product.description ||
                "Premium sportswear designed for comfort, flexibility, and clean everyday performance. Perfect for gym, training, running, and active lifestyle looks."}
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Select Size
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      selectedSize === size
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Quantity
              </h3>

              <div className="mt-4 inline-flex items-center rounded-full border border-slate-300 bg-white">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="rounded-l-full px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-[50px] text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="rounded-r-full px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                <ShoppingBag size={18} />
                Add To Cart
              </button>

              <button className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                Buy Now
              </button>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Product Highlights
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Breathable premium fabric
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Comfortable athletic fit
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Suitable for daily training
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Easy to style and wear
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                You May Also Like
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                Related Products
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ProductDetailsPage;
