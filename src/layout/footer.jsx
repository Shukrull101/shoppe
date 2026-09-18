import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Верхняя часть: ссылки и подписка на рассылку */}
        <div className={styles.topRow}>
          <div className={styles.links}>
            <Link to="/contact">CONTACT</Link>
            <Link to="/terms">TERMS OF SERVICES</Link>
            <Link to="/shipping">SHIPPING AND RETURNS</Link>
          </div>

          <div className={styles.newsletter}>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Give an email, get the newsletter." />
              <button type="submit">→</button>
            </div>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              <span>i agree to the website’s terms and conditions</span>
            </label>
          </div>
        </div>

        {/* Нижняя часть: копирайт и социальные сети */}
        <div className={styles.bottomRow}>
          <p>© 2026 Shoppe. Terms of use and privacy policy.</p>
          <div className={styles.socials}>
            <span>Follow us</span>
            <span className={styles.line}></span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">in</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">ig</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">t</a>
          </div>
        </div>
      </div>
    </footer>
  );
}