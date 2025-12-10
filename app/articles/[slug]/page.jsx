'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { getArticleBySlug, articles } from '@/data/articles'
import './article.css'

// Composant pour rendre les blocs de contenu
const ContentBlock = ({ block, lang }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="article__paragraph">{block.text}</p>

    case 'heading':
      return <h2 className="article__heading">{block.text}</h2>

    case 'image':
      return (
        <figure className="article__figure">
          <img src={block.src} alt={block.alt} className="article__image" />
          {block.caption && (
            <figcaption className="article__caption">{block.caption}</figcaption>
          )}
        </figure>
      )

    case 'quote':
      return (
        <blockquote className="article__quote">
          <p>{block.text}</p>
          {block.author && <cite>— {block.author}</cite>}
        </blockquote>
      )

    case 'list':
      return (
        <ul className="article__list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

export default function ArticlePage() {
  const params = useParams()
  const { lang } = useLanguage()
  const article = getArticleBySlug(params.slug)

  const content = {
    fr: {
      backToArticles: 'Retour aux articles',
      minRead: 'min de lecture',
      share: 'Partager',
      relatedTitle: 'À lire aussi',
      notFound: 'Article non trouvé',
      notFoundText: 'Cet article n\'existe pas ou a été déplacé.',
      backHome: 'Retour à l\'accueil'
    },
    en: {
      backToArticles: 'Back to articles',
      minRead: 'min read',
      share: 'Share',
      relatedTitle: 'Related articles',
      notFound: 'Article not found',
      notFoundText: 'This article doesn\'t exist or has been moved.',
      backHome: 'Back home'
    }
  }

  const t = content[lang]

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Page 404 si article non trouvé
  if (!article) {
    return (
      <main className="article-not-found">
        <h1>{t.notFound}</h1>
        <p>{t.notFoundText}</p>
        <Link href="/" className="article-not-found__link">{t.backHome}</Link>
      </main>
    )
  }

  // Articles liés (même catégorie, sans l'article actuel)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2)

  const articleContent = article.content[lang] || article.content.fr

  return (
    <main className="article">
      {/* Hero */}
      <header className="article__hero">
        <div className="article__hero-image-wrapper">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="article__hero-image"
          />
          <div className="article__hero-overlay"></div>
        </div>
        <div className="article__hero-content">
          <Link href="/articles" className="article__back">
            ← {t.backToArticles}
          </Link>
          <span className="article__category-badge">
            {article.categoryLabel[lang]}
          </span>
          <h1 className="article__title">{article.title}</h1>
          <div className="article__meta">
            <span className="article__city">{article.city}</span>
            <span className="article__separator">·</span>
            <span className="article__date">{formatDate(article.date)}</span>
            <span className="article__separator">·</span>
            <span className="article__read-time">{article.readTime} {t.minRead}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="article__content">
        <div className="article__body">
          {articleContent.map((block, index) => (
            <ContentBlock key={index} block={block} lang={lang} />
          ))}
        </div>

        {/* Share */}
        <div className="article__share">
          <span className="article__share-label">{t.share}</span>
          <div className="article__share-buttons">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="article__share-btn"
              aria-label="Share on WhatsApp"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="article__share-btn"
              aria-label="Share on X"
              title="X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="article__share-btn"
              aria-label="Share on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram (copie le lien car pas de share direct) */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert(lang === 'fr' ? 'Lien copié ! Colle-le dans ta story Instagram.' : 'Link copied! Paste it in your Instagram story.')
              }}
              className="article__share-btn"
              aria-label="Share on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </button>
            {/* TikTok (copie le lien) */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert(lang === 'fr' ? 'Lien copié ! Colle-le dans ta bio TikTok.' : 'Link copied! Paste it in your TikTok bio.')
              }}
              className="article__share-btn"
              aria-label="Share on TikTok"
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </button>
            {/* Snapchat (copie le lien) */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert(lang === 'fr' ? 'Lien copié ! Colle-le dans Snapchat.' : 'Link copied! Paste it in Snapchat.')
              }}
              className="article__share-btn"
              aria-label="Share on Snapchat"
              title="Snapchat"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03a4.22 4.22 0 01-.789-.12c-.45-.105-1.05-.193-1.768-.193-.6 0-1.05.044-1.439.135-.6.135-1.139.61-1.768 1.17-.57.51-1.139 1.08-1.889 1.08h-.074c-.75 0-1.319-.569-1.889-1.08-.63-.555-1.169-1.035-1.769-1.17-.389-.09-.839-.135-1.439-.135-.749 0-1.349.088-1.798.193-.284.06-.539.12-.764.12-.254 0-.449-.12-.539-.405-.061-.193-.105-.374-.135-.553-.044-.195-.105-.479-.164-.57-1.873-.283-2.906-.702-3.146-1.271a.498.498 0 01-.045-.225c-.015-.239.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.209-.645.119-.869-.195-.449-.884-.674-1.333-.809a5.552 5.552 0 01-.345-.12c-.823-.328-1.228-.718-1.213-1.168 0-.36.284-.689.734-.838.149-.06.326-.09.509-.09.12 0 .299.015.449.104.39.181.748.301 1.048.301.183 0 .314-.045.387-.09-.007-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.229-3.654.3-4.848C7.859 1.069 11.216.793 12.206.793z"/>
              </svg>
            </button>
            {/* SMS */}
            <a
              href={`sms:?body=${encodeURIComponent(article.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
              className="article__share-btn"
              aria-label="Share via SMS"
              title="SMS"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </a>
            {/* Copier le lien */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert(lang === 'fr' ? 'Lien copié !' : 'Link copied!')
              }}
              className="article__share-btn"
              aria-label="Copy link"
              title={lang === 'fr' ? 'Copier le lien' : 'Copy link'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="article__related">
          <h2 className="article__related-title">{t.relatedTitle}</h2>
          <div className="article__related-grid">
            {relatedArticles.map(related => (
              <Link
                key={related.id}
                href={`/articles/${related.slug}`}
                className="article__related-card"
              >
                <div className="article__related-image-wrapper">
                  <img
                    src={related.image}
                    alt={related.imageAlt}
                    className="article__related-image"
                  />
                </div>
                <div className="article__related-content">
                  <span className="article__related-category">
                    {related.categoryLabel[lang]}
                  </span>
                  <h3 className="article__related-card-title">{related.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
