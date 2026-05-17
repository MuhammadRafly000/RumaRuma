import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout.jsx';
import Home from '@/pages/Home.jsx';
import CategoryPage from '@/pages/CategoryPage.jsx';
import ProductDetail from '@/pages/ProductDetail.jsx';
import CartPage from '@/pages/CartPage.jsx';
import WishlistPage from '@/pages/WishlistPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kategori" element={<CategoryPage />} />
        <Route path="/kategori/:slug" element={<CategoryPage />} />
        <Route path="/produk/:slug" element={<ProductDetail />} />
        <Route path="/keranjang" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
