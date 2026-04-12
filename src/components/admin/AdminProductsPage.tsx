import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../layout/AdminLayout";

const BASE_URL = "http://127.0.0.1:8000";

type ProductType = {
  _id: string;
  name: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  price: number;
  oldPrice?: number | null;
  image: string;
  description?: string;
  isNew?: boolean;
  isTrending?: boolean;
  sizes: string[];
  stock: number;
  isActive: boolean;
};

const categories = [
  "T-Shirts",
  "Jerseys",
  "Tracksuits",
  "Gym Wear",
  "Hoodies",
  "Jackets",
];

const genders: ProductType["gender"][] = ["Men", "Women", "Unisex"];
const availableSizes = ["S", "M", "L", "XL", "XXL"];

type ProductFormState = {
  name: string;
  category: string;
  gender: ProductType["gender"];
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  isNew: boolean;
  isTrending: boolean;
  sizes: string[];
  stock: string;
  isActive: boolean;
};

const getDefaultFormData = (): ProductFormState => ({
  name: "",
  category: "T-Shirts",
  gender: "Men",
  price: "",
  oldPrice: "",
  image: "",
  description: "",
  isNew: true,
  isTrending: false,
  sizes: ["M"],
  stock: "0",
  isActive: true,
});

const getFormDataFromProduct = (product: ProductType): ProductFormState => ({
  name: product.name,
  category: product.category,
  gender: product.gender,
  price: String(product.price),
  oldPrice: product.oldPrice ? String(product.oldPrice) : "",
  image: product.image,
  description: product.description || "",
  isNew: !!product.isNew,
  isTrending: !!product.isTrending,
  sizes: product.sizes?.length ? product.sizes : ["M"],
  stock: String(product.stock ?? 0),
  isActive: product.isActive,
});

const AdminProductsPage = () => {
  const { token } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] =
    useState<ProductFormState>(getDefaultFormData());

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${BASE_URL}/api/products/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products);
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

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.sizes.includes(size);

      if (alreadySelected) {
        const updatedSizes = prev.sizes.filter((item) => item !== size);
        return {
          ...prev,
          sizes: updatedSizes.length ? updatedSizes : ["M"],
        };
      }

      return {
        ...prev,
        sizes: [...prev.sizes, size],
      };
    });
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
  };

  const closeAddModal = () => {
    resetForm();
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    resetForm();
    setEditingProductId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setEditingProductId(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductType) => {
    setFormData(getFormDataFromProduct(product));
    setIsAddModalOpen(false);
    setEditingProductId(product._id);
  };

  const buildPayload = () => ({
    name: formData.name,
    category: formData.category,
    gender: formData.gender,
    price: Number(formData.price),
    oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
    image:
      formData.image ||
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    description: formData.description,
    isNew: formData.isNew,
    isTrending: formData.isTrending,
    sizes: formData.sizes,
    stock: Number(formData.stock),
    isActive: formData.isActive,
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/api/products/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildPayload()),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      setProducts((prev) => [data.product, ...prev]);
      closeAddModal();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProductId) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/products/admin/${editingProductId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(buildPayload()),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      setProducts((prev) =>
        prev.map((item) =>
          item._id === editingProductId ? data.product : item,
        ),
      );

      closeEditModal();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/api/products/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const renderProductModal = ({
    title,
    subtitle,
    submitText,
    onSubmit,
    onClose,
  }: {
    title: string;
    subtitle: string;
    submitText: string;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
  }) => (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/45"
      />

      <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="overflow-y-auto px-5 py-5 sm:px-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Product Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter product name"
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  >
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Price
                  </label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Enter price"
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Old Price
                  </label>
                  <input
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Enter old price"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Stock
                  </label>
                  <input
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Enter stock"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Paste image URL"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter product description"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-slate-800">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          formData.sizes.includes(size)
                            ? "bg-slate-900 text-white"
                            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        name="isNew"
                        checked={formData.isNew}
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                      Mark as New
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        name="isTrending"
                        checked={formData.isTrending}
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                      Mark as Trending
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  {submitText}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );

  return (
    <AdminLayout
      title="Manage Products"
      subtitle="Add, edit, delete, and organize your store products."
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
              />
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-600">Loading products...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Gender
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Stock
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
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 rounded-2xl object-cover"
                          />
                          <div>
                            <h3 className="max-w-[240px] text-sm font-bold text-slate-900">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              ID: #{product._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        {product.category}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        {product.gender}
                      </td>

                      <td className="px-6 py-5 text-sm font-bold text-slate-900">
                        ₹{product.price}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        {product.stock}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            product.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-bold text-slate-900">
                          {product.name}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                            product.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        ID: #{product._id}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                          {product.category}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                          {product.gender}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-extrabold text-slate-900">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-10 text-center">
                <h3 className="text-xl font-bold text-slate-900">
                  No products found
                </h3>
                <p className="mt-2 text-slate-600">
                  Try a different search term.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isAddModalOpen &&
          renderProductModal({
            title: "Add New Product",
            subtitle: "Fill in the product details below",
            submitText: "Add Product",
            onSubmit: handleAddProduct,
            onClose: closeAddModal,
          })}
      </AnimatePresence>

      <AnimatePresence>
        {editingProductId !== null &&
          renderProductModal({
            title: "Edit Product",
            subtitle: "Update the selected product details",
            submitText: "Save Changes",
            onSubmit: handleEditProduct,
            onClose: closeEditModal,
          })}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminProductsPage;
