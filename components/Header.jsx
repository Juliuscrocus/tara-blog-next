'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ScrollLink from './ScrollLink'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header__inner">
        <nav className="header__nav header__nav--left">
          <Link href="/articles">{t.nav.journal}</Link>
          <Link href="/guides">{t.nav.guides}</Link>
          <ScrollLink href="/#cafes">{t.nav.addresses}</ScrollLink>
        </nav>

        <Link href="/" className="header__logo">
          Entre Deux
        </Link>

        <div className="header__actions">
          <nav className="header__nav header__nav--right">
            <ScrollLink href="/#contact">{t.nav.contact}</ScrollLink>
            <ScrollLink href="/#about">{t.nav.about}</ScrollLink>
          </nav>

          <div className="header__toggles">
            <button
              className="header__toggle"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <button
              className="header__toggle header__toggle--theme"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {/* Icône fixe côté serveur, puis dynamique après hydratation */}
              {!mounted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              )}
            </button>
          </div>

          <button
            className={`header__burger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`header__mobile ${menuOpen ? 'is-open' : ''}`}>
        <nav className="header__mobile-nav">
          <Link href="/articles" onClick={() => setMenuOpen(false)}>{t.nav.journal}</Link>
          <Link href="/guides" onClick={() => setMenuOpen(false)}>{t.nav.guides}</Link>
          <ScrollLink href="/#cafes" onClick={() => setMenuOpen(false)}>{t.nav.addresses}</ScrollLink>
          <ScrollLink href="/#newsletter" onClick={() => setMenuOpen(false)}>{t.nav.letter}</ScrollLink>
          <ScrollLink href="/#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</ScrollLink>
          <ScrollLink href="/#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</ScrollLink>
        </nav>
        <div className="header__mobile-toggles">
          <button onClick={toggleLang}>{lang === 'fr' ? 'English' : 'Français'}</button>
          <button onClick={toggleTheme}>{theme === 'light' ? 'Mode nuit' : 'Mode jour'}</button>
        </div>
      </div>
    </header>
  )
}

export default Header
