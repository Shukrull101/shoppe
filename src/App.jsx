import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './layout/Layout';
import { AccountProvider, AccountPage, ForgotPasswordPage } from './account';

export default function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          {/* Главный Layout объединяет шапку и футер (не изменяются) */}
          <Route path="/" element={<Layout />}>
            {/* Главная страница с навигационной карточкой к аккаунту */}
            <Route 
              index 
              element={
                <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '50vh' }}>
                  <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Добро пожаловать в Shoppe!</h1>
                  <p style={{ color: '#707070', marginBottom: '24px' }}>
                    Шапка и футер успешно подключены через макет.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Link
                      to="/profile"
                      style={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        padding: '12px 28px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        letterSpacing: '1px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        borderRadius: '2px',
                        display: 'inline-block',
                      }}
                    >
                      Личный кабинет / Авторизация
                    </Link>
                  </div>
                </div>
              } 
            />

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