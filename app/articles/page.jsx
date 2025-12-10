'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { articles } from '@/data/articles'
import '@/app/articles/articles.css'

export default function ArticlesPage() {
  const { lang } = useLanguage()

  const content = {
    fr: {
      label: 'Journal',
      title: 'Toutes mes',
      subtitle: 'notes',
      description: 'Cafés, gastronomie, vins et spiritueux. Mes découvertes au fil des mois.',
      filterAll: 'Tout',
      filterCafes: 'Cafés',
      filterGastro: 'Gastronomie',
      filterVins: 'Vins',
      readMore: 'Lire',
      minRead: 'min de lecture'
    },
    en: {
      label: 'Journal',
      title: 'All my',
      subtitle: 'notes',
      description: 'Coffee, gastronomy, wines and spirits. My discoveries over the months.',
      filterAll: 'All',
      filterCafes: 'Coffee',
      filterGastro: 'Gastronomy',
      filterVins: 'Wine',
      readMore: 'Read',
      minRead: 'min read'
    }
  }

  const t = content[lang]

  const categories = [
    { key: 'all', label: t.filterAll, href: '/articles' },
    { key: 'cafes', label: t.filterCafes, href: '/articles/cafes' },
    { key: 'gastronomie', label: t.filterGastro, href: '/articles/gastronomie' },
    { key: 'vins', label: t.filterVins, href: '/articles/vins' },
  ]

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <main className="articles-page">
      {/* Hero Section */}
      <section className="articles-page__hero">
        <div className="articles-page__hero-content">
          <span className="articles-page__label">{t.label}</span>
          <h1 className="articles-page__title">
            {t.title}
            <br />
            <em>{t.subtitle}</em>
          </h1>
          <p className="articles-page__description">{t.description}</p>
        </div>
      </section>

      {/* Filters */}
      <nav className="articles-page__filters">
        <div className="articles-page__filters-inner">
          {categories.map(cat => (
            <Link
              key={cat.key}
              href={cat.href}
              className={`articles-page__filter ${cat.key === 'all' ? 'is-active' : ''}`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Articles Grid */}
      <section className="articles-page__grid-section">
        <div className="articles-page__grid">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className={`article-card ${index === 0 ? 'article-card--featured' : ''}`}
            >
              <Link href={`/articles/${article.slug}`} className="article-card__link">
                <div className="article-card__image-wrapper">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="article-card__image"
                  />
                  <span className="article-card__category">
                    {article.categoryLabel[lang]}
                  </span>
                </div>
                <div className="article-card__content">
                  <div className="article-card__meta">
                    <span className="article-card__city">{article.city}</span>
                    <span className="article-card__separator">·</span>
                    <span className="article-card__date">{formatDate(article.date)}</span>
                  </div>
                  <h2 className="article-card__title">{article.title}</h2>
                  <p className="article-card__excerpt">{article.excerpt}</p>
                  <div className="article-card__footer">
                    <span className="article-card__read-time">
                      {article.readTime} {t.minRead}
                    </span>
                    <span className="article-card__read-more">{t.readMore}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
