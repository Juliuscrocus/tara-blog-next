'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { guides } from '@/data/articles'
import './guides.css'

export default function GuidesPage() {
  const { lang } = useLanguage()

  const content = {
    fr: {
      label: 'Guides',
      title: 'Mes carnets',
      subtitle: 'de voyage',
      description: 'Des guides complets avec mes meilleures adresses dans chaque ville. À télécharger et emporter partout.',
      places: 'adresses',
      download: 'Télécharger',
      comingSoon: 'Bientôt disponible',
      free: 'Gratuit'
    },
    en: {
      label: 'Guides',
      title: 'My travel',
      subtitle: 'notebooks',
      description: 'Complete guides with my best addresses in each city. Download and take everywhere.',
      places: 'places',
      download: 'Download',
      comingSoon: 'Coming soon',
      free: 'Free'
    }
  }

  const t = content[lang]

  return (
    <main className="guides-page">
      {/* Hero Section */}
      <section className="guides-page__hero">
        <div className="guides-page__hero-content">
          <span className="guides-page__label">{t.label}</span>
          <h1 className="guides-page__title">
            {t.title}
            <br />
            <em>{t.subtitle}</em>
          </h1>
          <p className="guides-page__description">{t.description}</p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="guides-page__grid-section">
        <div className="guides-page__grid">
          {guides.map(guide => (
            <article key={guide.id} className="guide-card">
              <div className="guide-card__image-wrapper">
                <img
                  src={guide.image}
                  alt={guide.city}
                  className="guide-card__image"
                />
                <div className="guide-card__overlay">
                  <span className="guide-card__city">{guide.city}</span>
                </div>
                {guide.available && (
                  <span className="guide-card__badge">{t.free}</span>
                )}
              </div>
              <div className="guide-card__content">
                <h2 className="guide-card__title">{guide.title[lang]}</h2>
                <p className="guide-card__subtitle">{guide.subtitle[lang]}</p>
                <p className="guide-card__description">{guide.description[lang]}</p>
                <div className="guide-card__footer">
                  <span className="guide-card__places">
                    {guide.places} {t.places}
                  </span>
                  {guide.available ? (
                    <a
                      href={`/guides/${guide.slug}.pdf`}
                      download
                      className="guide-card__download"
                    >
                      {t.download}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </a>
                  ) : (
                    <span className="guide-card__coming-soon">{t.comingSoon}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="guides-page__cta">
        <div className="guides-page__cta-content">
          <h2 className="guides-page__cta-title">
            {lang === 'fr' ? 'Un nouveau guide chaque année' : 'A new guide every year'}
          </h2>
          <p className="guides-page__cta-text">
            {lang === 'fr'
              ? 'Inscris-toi à la newsletter pour être prévenue dès qu\'un nouveau guide sort.'
              : 'Subscribe to the newsletter to be notified when a new guide comes out.'}
          </p>
          <Link href="/#newsletter" className="guides-page__cta-btn">
            {lang === 'fr' ? 'S\'inscrire' : 'Subscribe'}
          </Link>
        </div>
      </section>
    </main>
  )
}
