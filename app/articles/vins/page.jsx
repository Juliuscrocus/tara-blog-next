'use client'

import ArticlesList from '@/components/ArticlesList'
import { getArticlesByCategory } from '@/data/articles'

export default function VinsPage() {
  const articles = getArticlesByCategory('vins')

  const categoryInfo = {
    label: { fr: 'Journal', en: 'Journal' },
    title: { fr: 'Vins', en: 'Wine' },
    subtitle: { fr: '& spiritueux', en: '& spirits' },
    description: {
      fr: 'Caves à vin, bars à champagne, découvertes œnologiques.',
      en: 'Wine cellars, champagne bars, oenological discoveries.'
    }
  }

  return <ArticlesList articles={articles} categoryKey="vins" categoryInfo={categoryInfo} />
}
