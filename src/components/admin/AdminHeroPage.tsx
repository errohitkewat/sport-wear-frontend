import { motion } from "framer-motion";
import { ImageIcon, Loader2, Save, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../layout/AdminLayout";

const BASE_URL = "http://127.0.0.1:8000";

type HeroType = {
  image: string;
  titleLeft: string;
  titleRight: string;
};

const AdminHeroPage = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState<HeroType>({
    image: "",
    titleLeft: "",
    titleRight: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(`${BASE_URL}/api/hero`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch hero");
        }

        if (data.hero) {
          setFormData({
            image: data.hero.image || "",
            titleLeft: data.hero.titleLeft || "",
            titleRight: data.hero.titleRight || "",
          });
        }
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

    fetchHero();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSuccessMessage("");
    setErrorMessage("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    try {
      setSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const response = await fetch(`${BASE_URL}/api/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update hero");
      }

      setSuccessMessage("Hero section updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Hero Section"
      subtitle="Manage the homepage hero content and center image."
    >
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">Loading hero content...</p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <motion.form
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSave}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                <Sparkles size={22} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Edit Hero Content
                </h2>
                <p className="text-sm text-slate-500">
                  Update hero text and center model image
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Left Title
                </label>
                <input
                  type="text"
                  name="titleLeft"
                  value={formData.titleLeft}
                  onChange={handleChange}
                  placeholder="Enter left title"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Right Title
                </label>
                <input
                  type="text"
                  name="titleRight"
                  value={formData.titleRight}
                  onChange={handleChange}
                  placeholder="Enter right title"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Center Image URL
                </label>
                <textarea
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Paste image URL"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Hero"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <ImageIcon size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Live Preview
                  </h2>
                  <p className="text-sm text-slate-500">
                    Preview hero content before saving
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4">
              <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-black text-white">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80"
                    alt="Hero background"
                    className="h-full w-full object-cover opacity-20"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/75" />

                <div className="relative flex h-full min-h-[560px] items-center justify-between px-6">
                  <div className="max-w-[32%]">
                    <p className="text-[34px] font-black uppercase leading-none tracking-tight text-white/90">
                      {formData.titleLeft || "Sport"}
                    </p>
                    <div className="mt-2 inline-block border-2 border-orange-500 px-3 py-3">
                      <p className="text-[48px] font-black uppercase leading-none tracking-tight text-white">
                        Wear
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 bottom-0 h-full -translate-x-1/2">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Hero center"
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-[260px] items-center justify-center text-slate-500">
                        No image selected
                      </div>
                    )}
                  </div>

                  <div className="ml-auto max-w-[34%] text-right">
                    <h3 className="text-[42px] font-black uppercase leading-[0.9] tracking-tight text-white/90">
                      {formData.titleRight || "Your Style"}
                    </h3>

                    <div className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black">
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminHeroPage;
