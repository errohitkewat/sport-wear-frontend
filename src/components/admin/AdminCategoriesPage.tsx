import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../layout/AdminLayout";

const BASE_URL = "http://127.0.0.1:8000";

type CategoryType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  isActive: boolean;
};

type CategoryFormState = {
  title: string;
  description: string;
  image: string;
  isActive: boolean;
};

const getDefaultFormData = (): CategoryFormState => ({
  title: "",
  description: "",
  image: "",
  isActive: true,
});

const getFormDataFromCategory = (
  category: CategoryType,
): CategoryFormState => ({
  title: category.title,
  description: category.description || "",
  image: category.image,
  isActive: category.isActive,
});

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 20 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const AdminCategoriesPage = () => {
  const { token } = useAuth();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );
  const [formData, setFormData] =
    useState<CategoryFormState>(getDefaultFormData());

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${BASE_URL}/api/categories/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch categories");
      }

      setCategories(data.categories || []);
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
    fetchCategories();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const resetForm = () => {
    setFormData(getDefaultFormData());
  };

  const closeAddModal = () => {
    resetForm();
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    resetForm();
    setEditingCategoryId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setEditingCategoryId(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (category: CategoryType) => {
    setFormData(getFormDataFromCategory(category));
    setIsAddModalOpen(false);
    setEditingCategoryId(category._id);
  };

  const buildPayload = () => ({
    title: formData.title,
    description: formData.description,
    image: formData.image,
    isActive: formData.isActive,
  });

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/api/categories/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildPayload()),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add category");
      }

      setCategories((prev) => [data.category, ...prev]);
      closeAddModal();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingCategoryId) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/categories/admin/${editingCategoryId}`,
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
        throw new Error(data.message || "Failed to update category");
      }

      setCategories((prev) =>
        prev.map((item) =>
          item._id === editingCategoryId ? data.category : item,
        ),
      );

      closeEditModal();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/api/categories/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete category");
      }

      setCategories((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const renderCategoryModal = ({
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
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/45"
      />

      <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
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
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Category Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter category title"
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter category description"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Paste category image URL"
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                  />
                </div>

                {formData.image && (
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-3">
                    <img
                      src={formData.image}
                      alt="Category preview"
                      className="h-56 w-full rounded-2xl object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    Active Category
                  </label>
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
      title="Manage Categories"
      subtitle="Add, edit, delete, and organize homepage categories."
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
                placeholder="Search categories..."
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
              Add Category
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-600">Loading categories...</p>
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
              <table className="w-full min-w-[950px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Slug
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
                  {filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="h-16 w-16 rounded-2xl object-cover"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {category.title}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              ID: #{category._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        <p className="line-clamp-2 max-w-[320px]">
                          {category.description || "No description"}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        {category.slug}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            category.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenEditModal(category)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteCategory(category._id)}
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
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-bold text-slate-900">
                          {category.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                            category.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {category.slug}
                      </p>

                      <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                        {category.description || "No description"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleOpenEditModal(category)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="p-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <ImageIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  No categories found
                </h3>
                <p className="mt-2 text-slate-600">
                  Try a different search term or add a new category.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isAddModalOpen &&
          renderCategoryModal({
            title: "Add New Category",
            subtitle: "Create a new category for homepage and shop sections",
            submitText: "Add Category",
            onSubmit: handleAddCategory,
            onClose: closeAddModal,
          })}
      </AnimatePresence>

      <AnimatePresence>
        {editingCategoryId !== null &&
          renderCategoryModal({
            title: "Edit Category",
            subtitle: "Update the selected category details",
            submitText: "Save Changes",
            onSubmit: handleEditCategory,
            onClose: closeEditModal,
          })}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
