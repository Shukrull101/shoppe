import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header'; // Импортируем хедер из этой же папки
import Footer from './footer'; // Импортируем футер из этой же папки

export default function Layout() {
  return (
    <div className="wrapper">
      {/* Шапка отображается на всех страницах */}
      <Header />

      {/* Динамический блок, куда будут подставляться страницы (Home, Shop и т.д.) */}
      <main>
        <Outlet />
      </main>

      {/* Футер также отображается на всех страницах */}
      <Footer />
    </div>
  );
}