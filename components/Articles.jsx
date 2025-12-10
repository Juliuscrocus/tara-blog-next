'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Articles.css'

// Mapping des catégories vers les URLs
const categoryUrls = {
  champagne: '/articles/vins',
  gastro: '/articles/gastronomie',
  cafe: '/articles/cafes',
}

const categoriesData = {
  fr: [
    {
      id: 'champagne',
      name: 'Champagne & Vin',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 3v5l6 7v6M18 3v5l-6 7v6M4 3h16M10 21h4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      articles: [
        { title: 'Initiation au champagne : mes premières bulles à Épernay', date: '15 Nov' },
        { title: 'Guide des caves à champagne de Reims', date: '8 Nov' },
        { title: 'Les meilleurs bars à vin naturel de Paris', date: '2 Nov' },
      ],
      image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1200&h=1400',
    },
    {
      id: 'gastro',
      name: 'Gastronomie',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="9"/>
          <circle cx="12" cy="12" r="6"/>
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round"/>
        </svg>
      ),
      articles: [
        { title: 'Le dîner qui m\'a fait tomber amoureuse de la cuisine française', date: '10 Nov' },
        { title: 'Mes tables bistronomiques préférées à Paris', date: '6 Nov' },
        { title: 'Food market tour : Marché des Enfants Rouges', date: '1 Nov' },
      ],
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=1400',
    },
    {
      id: 'cafe',
      name: 'Café',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 11h10v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-8z"/>
          <path d="M16 13h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2"/>
          <path d="M9 6c0-1 .5-2 1-2s1 1 1 0 .5-2 1-2 1 1 1 0" strokeLinecap="round"/>
        </svg>
      ),
      articles: [
        { title: 'Mon rituel du matin : espresso et slow living parisien', date: '5 Nov' },
        { title: 'Les secrets d\'un flat white parfait', date: '28 Oct' },
        { title: 'Coffee crawl : mes 5 cafés du Marais', date: '20 Oct' },
      ],
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=1400',
    },
  ],
  en: [
    {
      id: 'champagne',
      name: 'Champagne & Wine',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 3v5l6 7v6M18 3v5l-6 7v6M4 3h16M10 21h4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      articles: [
        { title: 'Champagne initiation: my first bubbles in Épernay', date: 'Nov 15' },
        { title: 'Guide to Reims champagne cellars', date: 'Nov 8' },
        { title: 'The best natural wine bars in Paris', date: 'Nov 2' },
      ],
      image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1200&h=1400',
    },
    {
      id: 'gastro',
      name: 'Gastronomy',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="9"/>
          <circle cx="12" cy="12" r="6"/>
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round"/>
        </svg>
      ),
      articles: [
        { title: 'The dinner that made me fall in love with French cuisine', date: 'Nov 10' },
        { title: 'My favorite bistronomic tables in Paris', date: 'Nov 6' },
        { title: 'Food market tour: Marché des Enfants Rouges', date: 'Nov 1' },
      ],
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=1400',
    },
    {
      id: 'cafe',
      name: 'Coffee',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 11h10v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-8z"/>
          <path d="M16 13h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2"/>
          <path d="M9 6c0-1 .5-2 1-2s1 1 1 0 .5-2 1-2 1 1 1 0" strokeLinecap="round"/>
        </svg>
      ),
      articles: [
        { title: 'My morning ritual: espresso and Parisian slow living', date: 'Nov 5' },
        { title: 'The secrets of a perfect flat white', date: 'Oct 28' },
        { title: 'Coffee crawl: my 5 Marais cafés', date: 'Oct 20' },
      ],
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=1400',
    },
  ],
}

const Articles = () => {
  const { lang, t } = useLanguage()
  const sectionRef = useScrollReveal()
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const categories = categoriesData[lang]

  return (
    <section className="articles" id="articles" ref={sectionRef}>
      <div className="articles__header reveal">
        <span className="articles__label">{t.articles.label}</span>
        <h2 className="articles__title">{t.articles.title}</h2>
      </div>

      <div className="articles__categories">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`category reveal reveal-delay-${index + 1}`}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Background image (appears on hover) */}
            <div className={`category__bg ${hoveredCategory === category.id ? 'is-visible' : ''}`}>
              <img src={category.image} alt={category.name} />
              <div className="category__overlay"></div>
            </div>

            {/* Content */}
            <div className="category__content">
              <div className="category__icon">{category.icon}</div>
              <h3 className="category__name">{category.name}</h3>

              {/* Link to category page (appears on hover) */}
              <Link
                href={categoryUrls[category.id]}
                className={`category__link ${hoveredCategory === category.id ? 'is-visible' : ''}`}
              >
                {lang === 'fr' ? 'Découvrir' : 'Explore'} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Articles
