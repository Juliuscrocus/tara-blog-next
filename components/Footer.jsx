'use client'

import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Entre Deux</span>
          <p className="footer__tagline">
            {t.footer.tagline1}
            <br />
            {t.footer.tagline2}
          </p>
        </div>

        <nav className="footer__nav">
          <a href="#articles">{t.nav.journal}</a>
          <a href="#cafes">{t.nav.addresses}</a>
          <a href="#about">{t.nav.about}</a>
        </nav>

        <div className="footer__social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2024 Entre Deux</span>
      </div>
    </footer>
  )
}

export default Footer
