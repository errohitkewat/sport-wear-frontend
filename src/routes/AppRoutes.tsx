import { Route, Routes } from "react-router-dom";
import AccessoriesPage from "../pages/AccessoriesPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MenPage from "../pages/MenPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import RegisterPage from "../pages/RegisterPage";
import ShopPage from "../pages/ShopPage";
import WomenPage from "../pages/WomenPage";
import KidsPage from "../pages/KidsPage";

import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboardPage from "../components/admin/AdminDashboardPage";
import AdminProductsPage from "../components/admin/AdminProductsPage";
import AdminOrdersPage from "../components/admin/AdminOrdersPage";
import AdminUsersPage from "../components/admin/AdminUsersPage";
import AdminSettingsPage from "../components/admin/AdminSettingsPage";
import AdminHeroPage from "../components/admin/AdminHeroPage";
import AdminCategoriesPage from "../components/admin/AdminCategoriesPage";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/kids" element={<KidsPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />

      
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrdersPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsersPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <AdminSettingsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/hero"
        element={
          <AdminRoute>
            <AdminHeroPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <AdminCategoriesPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
