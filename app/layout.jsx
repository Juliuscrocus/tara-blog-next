import { Cormorant_Garamond, Outfit } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://entredeux.blog'),
  title: {
    default: 'Entre Deux - Art de Vivre',
    template: '%s | Entre Deux',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  description: 'Entre Paris et Dublin, entre café et champagne, entre gastronomie et simplicité. Un journal d\'art de vivre franco-irlandais.',
  keywords: ['art de vivre', 'café', 'champagne', 'gastronomie', 'Paris', 'Dublin', 'London', 'Osaka', 'lifestyle', 'blog'],
  authors: [{ name: 'Tara' }],
  creator: 'Tara',
  openGraph: {
    title: 'Entre Deux - Art de Vivre',
    description: 'Entre Paris et Dublin, entre café et champagne, entre gastronomie et simplicité.',
    url: 'https://entredeux.blog',
    siteName: 'Entre Deux',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=630&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Entre Deux - Art de Vivre',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entre Deux - Art de Vivre',
    description: 'Un journal d\'art de vivre franco-irlandais.',
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=630&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
