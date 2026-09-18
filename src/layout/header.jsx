import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

// Импорт иконок и логотипа
import logoImg from '../assets/shukrullo/SHOPPE.png';
import searchIcon from '../assets/shukrullo/search.png';
import cartIcon from '../assets/shukrullo/cart.png';
import profileIcon from '../assets/shukrullo/profile.png';

export default function Header() {
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
            <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
              <img src={cartIcon} alt="Cart" />
            </Link>
            <Link to="/profile" className={styles.iconBtn} aria-label="Profile">
              <img src={profileIcon} alt="Profile" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}       