'use client'

import ArticlesList from '@/components/ArticlesList'
import { getArticlesByCategory } from '@/data/articles'

export default function GastronomiePage() {
  const articles = getArticlesByCategory('gastronomie')

  const categoryInfo = {
    label: { fr: 'Journal', en: 'Journal' },
    title: { fr: 'Gastronomie', en: 'Gastronomy' },
    subtitle: { fr: '& tables d\'exception', en: '& fine dining' },
    description: {
      fr: 'Les restaurants qui m\'ont marquée, de la bistronomie aux étoilés.',
      en: 'The restaurants that moved me, from bistronomie to starred tables.'
    }
  }

  return <ArticlesList articles={articles} categoryKey="gastronomie" categoryInfo={categoryInfo} />
}
