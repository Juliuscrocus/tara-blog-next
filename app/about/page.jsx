'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import './about.css'

export default function AboutPage() {
  const { lang } = useLanguage()

  const content = {
    fr: {
      label: 'À propos',
      title: 'Je suis Tara',
      subtitle: 'Franco-irlandaise, entre Paris et Dublin',
      intro: 'Passionnée d\'art de vivre, de cafés de spécialité et de bonnes tables. Ce journal est né de mon envie de partager mes découvertes.',
      story: {
        title: 'Mon histoire',
        p1: 'Née à Dublin d\'une mère française et d\'un père irlandais, j\'ai grandi entre deux cultures, deux langues, deux façons de voir la vie. À 22 ans, j\'ai posé mes valises à Paris pour y étudier, et je ne suis jamais vraiment repartie.',
        p2: 'Aujourd\'hui, je travaille dans le marketing digital, mais ma vraie passion se trouve dans les petits plaisirs du quotidien : un espresso parfaitement dosé, une table avec vue, un verre de vin qui raconte une histoire.',
        p3: 'Entre Deux est né de cette envie de documenter mes découvertes. Pas un guide exhaustif, plutôt un carnet personnel que je partage avec vous. Des adresses testées et approuvées, des coups de cœur assumés.'
      },
      values: {
        title: 'Ma philosophie',
        items: [
          { title: 'L\'authenticité', text: 'Je ne recommande que les adresses que je fréquente vraiment. Pas de partenariats, pas de contenus sponsorisés.' },
          { title: 'La qualité', text: 'Je privilégie toujours le fait-maison, les producteurs locaux, les artisans passionnés.' },
          { title: 'Le partage', text: 'Les meilleures adresses sont celles qu\'on se transmet. C\'est comme ça que j\'ai découvert mes favoris.' }
        ]
      },
      cta: {
        title: 'Envie de discuter ?',
        text: 'Une question, une suggestion d\'adresse, ou juste envie de partager un café virtuel ?',
        button: 'Me contacter'
      }
    },
    en: {
      label: 'About',
      title: 'I\'m Tara',
      subtitle: 'Franco-Irish, between Paris and Dublin',
      intro: 'Passionate about art de vivre, specialty coffee and great tables. This journal was born from my desire to share my discoveries.',
      story: {
        title: 'My story',
        p1: 'Born in Dublin to a French mother and an Irish father, I grew up between two cultures, two languages, two ways of seeing life. At 22, I moved to Paris to study, and I never really left.',
        p2: 'Today, I work in digital marketing, but my true passion lies in life\'s small pleasures: a perfectly dosed espresso, a table with a view, a glass of wine that tells a story.',
        p3: 'Entre Deux was born from this desire to document my discoveries. Not an exhaustive guide, rather a personal notebook I share with you. Tested and approved addresses, unapologetic favorites.'
      },
      values: {
        title: 'My philosophy',
        items: [
          { title: 'Authenticity', text: 'I only recommend places I actually visit. No partnerships, no sponsored content.' },
          { title: 'Quality', text: 'I always favor homemade, local producers, passionate artisans.' },
          { title: 'Sharing', text: 'The best addresses are those we pass on. That\'s how I discovered my favorites.' }
        ]
      },
      cta: {
        title: 'Want to chat?',
        text: 'A question, an address suggestion, or just want to share a virtual coffee?',
        button: 'Contact me'
      }
    }
  }

  const t = content[lang]

  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-page__hero">
        <div className="about-page__hero-content">
          <span className="about-page__label">{t.label}</span>
          <h1 className="about-page__title">{t.title}</h1>
          <p className="about-page__subtitle">{t.subtitle}</p>
        </div>
      </section>

      {/* Intro with Image */}
      <section className="about-page__intro">
        <div className="about-page__intro-grid">
          <div className="about-page__intro-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&auto=format&fit=crop"
              alt="Tara"
              className="about-page__intro-image"
            />
          </div>
          <div className="about-page__intro-text">
            <p className="about-page__intro-lead">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="about-page__story">
        <div className="about-page__story-content">
          <h2 className="about-page__section-title">{t.story.title}</h2>
          <p>{t.story.p1}</p>
          <p>{t.story.p2}</p>
          <p>{t.story.p3}</p>
        </div>
      </section>

      {/* Values */}
      <section className="about-page__values">
        <h2 className="about-page__section-title">{t.values.title}</h2>
        <div className="about-page__values-grid">
          {t.values.items.map((item, index) => (
            <div key={index} className="about-page__value">
              <h3 className="about-page__value-title">{item.title}</h3>
              <p className="about-page__value-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-page__cta">
        <div className="about-page__cta-content">
          <h2 className="about-page__cta-title">{t.cta.title}</h2>
          <p className="about-page__cta-text">{t.cta.text}</p>
          <Link href="/contact" className="about-page__cta-btn">
            {t.cta.button}
          </Link>
        </div>
      </section>
    </main>
  )
}
