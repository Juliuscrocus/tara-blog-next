'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

const translations = {
  fr: {
    nav: {
      journal: 'Journal',
      guides: 'Guides',
      addresses: 'Adresses',
      letter: 'La lettre',
      contact: 'Contact',
      about: 'À propos',
    },
    hero: {
      label: 'Art de vivre',
      title1: 'Entre',
      title2: 'Deux',
      intro: 'Entre Paris et Dublin, entre café et champagne, entre gastronomie et simplicité. Un journal d\'art de vivre franco-irlandais.',
      scroll: 'Défiler',
    },
    about: {
      label: 'À propos',
      title1: 'Je suis Tara,',
      title2: 'entre Paris et Dublin',
      p1: 'Franco-irlandaise installée à Paris, je travaille dans le marketing mais ma vraie passion se trouve dans l\'art de vivre à la française.',
      p2: 'Ce journal documente mes découvertes — les cafés qui m\'inspirent, les tables qui me marquent, les vins qui racontent des histoires. Entre champagne et espresso, entre gastronomie et simplicité.',
      p3: 'Paris est mon terrain de jeu, mais Dublin reste gravé dans mon cœur. Je partage aussi ces moments sur Instagram et TikTok.',
      signature: '— Tara',
    },
    articles: {
      label: 'Journal',
      title: 'Dernières notes',
      readMore: 'Tous les articles',
      read: 'Lire',
    },
    cafes: {
      label: 'Adresses',
      title1: 'Mes adresses',
      title2: 'favorites',
      intro: 'Cafés, restaurants, bars à vin. Les lieux qui font vibrer mon palais et mon cœur.',
      allCities: 'Toutes les villes',
      viewMap: 'Voir la carte',
    },
    social: {
      label: 'Ailleurs',
      title1: 'Retrouve-moi',
      title2: 'sur les réseaux',
      text: 'Moments gastronomiques, découvertes et vlogs parisiens.',
    },
    footer: {
      tagline1: 'Art de vivre',
      tagline2: 'entre Paris et Dublin',
    },
  },
  en: {
    nav: {
      journal: 'Journal',
      guides: 'Guides',
      addresses: 'Addresses',
      letter: 'The letter',
      contact: 'Contact',
      about: 'About',
    },
    hero: {
      label: 'Art de vivre',
      title1: 'Entre',
      title2: 'Deux',
      intro: 'Between Paris and Dublin, between coffee and champagne, between gastronomy and simplicity. A Franco-Irish lifestyle journal.',
      scroll: 'Scroll',
    },
    about: {
      label: 'About',
      title1: 'I\'m Tara,',
      title2: 'between Paris and Dublin',
      p1: 'Franco-Irish and based in Paris, I work in marketing but my true passion lies in the French art de vivre.',
      p2: 'This journal documents my discoveries — the cafés that inspire me, the tables that move me, the wines that tell stories. Between champagne and espresso, between gastronomy and simplicity.',
      p3: 'Paris is my playground, but Dublin remains in my heart. I also share these moments on Instagram and TikTok.',
      signature: '— Tara',
    },
    articles: {
      label: 'Journal',
      title: 'Latest notes',
      readMore: 'All articles',
      read: 'Read',
    },
    cafes: {
      label: 'Addresses',
      title1: 'My favorite',
      title2: 'places',
      intro: 'Cafés, restaurants, wine bars. The places that make my heart and palate sing.',
      allCities: 'All cities',
      viewMap: 'View map',
    },
    social: {
      label: 'Elsewhere',
      title1: 'Find me',
      title2: 'on social media',
      text: 'Gastronomic moments, discoveries and Parisian vlogs.',
    },
    footer: {
      tagline1: 'Art de vivre',
      tagline2: 'between Paris and Dublin',
    },
  },
}

export const LanguageProvider = ({ children }) => {
  // Toujours 'fr' côté serveur pour éviter hydration mismatch
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    // Charger la préférence depuis localStorage après montage
    const saved = localStorage.getItem('lang')
    if (saved && saved !== lang) {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr')
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
