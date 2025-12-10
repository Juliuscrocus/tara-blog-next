'use client'

import ArticlesList from '@/components/ArticlesList'
import { getArticlesByCategory } from '@/data/articles'

export default function CafesPage() {
  const articles = getArticlesByCategory('cafes')

  const categoryInfo = {
    label: { fr: 'Journal', en: 'Journal' },
    title: { fr: 'Cafés', en: 'Coffee' },
    subtitle: { fr: '& coffee shops', en: '& coffee shops' },
    description: {
      fr: 'Mes adresses café favorites, des torréfacteurs de spécialité aux bistrots parisiens.',
      en: 'My favorite coffee spots, from specialty roasters to Parisian bistros.'
    }
  }

  return <ArticlesList articles={articles} categoryKey="cafes" categoryInfo={categoryInfo} />
}
