import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './layout/layout';
import { AccountProvider, AccountPage, ForgotPasswordPage } from './account';
import { ShopPage } from './shop';
import { HomePage } from './home';
import { ProductPage } from './product';
import { CartProvider, CartDrawer, CartPage } from './cart';
import { CheckoutPage, OrderConfirmationPage } from './checkout';
import { BlogPage, BlogPostPage } from './blog';

export default function App() {
  return (
    <AccountProvider>
      <CartProvider>
        <BrowserRouter>
          <CartDrawer />
          <Routes>
          {/* Главный Layout объединяет шапку и футер (не изменяются) */}
          <Route path="/" element={<Layout />}>
            {/* Главная страница с навигационной карточкой к аккаунту */}
            {/* Главная страница */}
            <Route index element={<HomePage />} />

            {/* Страница магазина */}
            <Route path="shop" element={<ShopPage />} />
            
            {/* Страница отдельного товара */}
            <Route path="shop/:id" element={<ProductPage />} />

            {/* Корзина и оформление заказа */}
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />

            {/* Блог */}
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogPostPage />} />

            {/* Аккаунтная система и личный кабинет (наша часть) */}
            <Route path="profile" element={<AccountPage />} />
            <Route path="my-account" element={<AccountPage />} />
            <Route path="account/*" element={<AccountPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AccountProvider>
  );
}