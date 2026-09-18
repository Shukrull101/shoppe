import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { useCart } from '../cart';

// Импорт иконок и логотипа
import logoImg from '../assets/shukrullo/SHOPPE.png';
import searchIcon from '../assets/shukrullo/search.png';
import cartIcon from '../assets/shukrullo/cart.png';
import profileIcon from '../assets/shukrullo/profile.png';

export default function Header() {
  const { toggleCart, cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип слева */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoImg} alt="SHOPPE" className={styles.logoImg} />
          </Link>
        </div>

        {/* Правая часть: навигация, разделитель и иконки */}
        <div className={styles.rightSide}>
          <nav className={styles.nav}>
            <Link to="/shop" className={styles.navLink}>Shop</Link>
            <Link to="/blog" className={styles.navLink}>Blog</Link>
            <Link to="/story" className={styles.navLink}>Our Story</Link>
          </nav>

          <span className={styles.divider}>|</span>

          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Search">
              <img src={searchIcon} alt="Search" />
            </button>
            <button onClick={toggleCart} className={styles.iconBtn} style={{ position: 'relative' }} aria-label="Cart">
              <img src={cartIcon} alt="Cart" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10" style={{ transform: 'scale(0.8)' }}>
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/profile" className={styles.iconBtn} aria-label="Profile">
              <img src={profileIcon} alt="Profile" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}       