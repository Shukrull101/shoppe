import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './layout/layout';
import { AccountProvider, AccountPage, ForgotPasswordPage } from './account';
import { ShopPage } from './shop';
import { HomePage } from './home';

export default function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          {/* Главный Layout объединяет шапку и футер (не изменяются) */}
          <Route path="/" element={<Layout />}>
            {/* Главная страница с навигационной карточкой к аккаунту */}
            {/* Главная страница */}
            <Route index element={<HomePage />} />

            {/* Страница магазина */}
            <Route path="shop" element={<ShopPage />} />

            {/* Аккаунтная система и личный кабинет (наша часть) */}
            <Route path="profile" element={<AccountPage />} />
            <Route path="my-account" element={<AccountPage />} />
            <Route path="account/*" element={<AccountPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}