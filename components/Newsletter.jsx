'use client'

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Newsletter.css'

const WEB3FORMS_KEY = '894d4cbc-a55f-40d1-87a5-fc1a9615bb13'

// Icônes élégantes SVG
const CoffeeIcon = () => (
  <svg className="newsletter__perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 1v3M10 1v3M14 1v3" strokeLinecap="round"/>
  </svg>
)

const MapIcon = () => (
  <svg className="newsletter__perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2v16M16 6v16" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SparkleIcon = () => (
  <svg className="newsletter__perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Newsletter = () => {
  const { lang } = useLanguage()
  const sectionRef = useScrollReveal()
  const [state, setState] = useState({ status: 'idle', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ status: 'loading', message: '' })

    const formData = new FormData(e.target)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', 'Newsletter - Nouvel abonné Entre Deux')
    formData.append('from_name', 'Entre Deux Newsletter')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setState({
          status: 'success',
          message: lang === 'fr' ? 'Bienvenue dans le club !' : 'Welcome to the club!',
        })
        e.target.reset()
      } else {
        throw new Error(data.message || 'Subscription failed')
      }
    } catch (error) {
      setState({
        status: 'error',
        message: lang === 'fr' ? 'Oops, réessaie !' : 'Oops, try again!',
      })
    }
  }

  const perks = [
    { icon: CoffeeIcon, textFr: 'Mes 5 découvertes du mois', textEn: 'My 5 discoveries of the month' },
    { icon: MapIcon, textFr: 'Le guide de Paris (une fois par an)', textEn: 'The Paris guide (once a year)' },
    { icon: SparkleIcon, textFr: 'Des adresses avant tout le monde', textEn: 'Secret spots before anyone else' },
  ]

  const content = {
    fr: {
      label: 'La lettre',
      title: 'Entre Deux',
      subtitle: 'lignes',
      description: 'Une fois par mois, je partage mes découvertes — les cafés qui m\'ont fait vibrer, les tables où j\'ai dit « wow », les vins qui racontent des histoires.',
      placeholder: 'ton@email.com',
      button: 'Je m\'inscris',
      noSpam: 'Promis, pas de spam. Juste du bon.',
      noSpamSub: '(Mon ratio café/email est de 30 pour 1)',
    },
    en: {
      label: 'The letter',
      title: 'Entre Deux',
      subtitle: 'lines',
      description: 'Once a month, I share my discoveries — the cafés that moved me, the tables where I said "wow", the wines that tell stories.',
      placeholder: 'your@email.com',
      button: 'Count me in',
      noSpam: 'No spam, promise. Just the good stuff.',
      noSpamSub: '(My coffee-to-email ratio is 30 to 1)',
    },
  }

  const t = content[lang]

  return (
    <section className="newsletter" id="newsletter" ref={sectionRef}>
      <div className="newsletter__container">
        <div className="newsletter__content reveal">
          <span className="newsletter__label">{t.label}</span>
          <h2 className="newsletter__title">
            {t.title}
            <br />
            <em>{t.subtitle}</em>
          </h2>
          <p className="newsletter__description">{t.description}</p>

          <ul className="newsletter__perks">
            {perks.map((perk, index) => {
              const IconComponent = perk.icon
              return (
                <li key={index} className="newsletter__perk">
                  <IconComponent />
                  <span className="newsletter__perk-text">
                    {lang === 'fr' ? perk.textFr : perk.textEn}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="newsletter__form-container reveal reveal-delay-1">
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              type="checkbox"
              name="botcheck"
              className="newsletter__honeypot"
              tabIndex={-1}
              autoComplete="off"
            />
            <input
              type="email"
              name="email"
              placeholder={t.placeholder}
              className="newsletter__input"
              required
              disabled={state.status === 'loading'}
            />
            <button
              type="submit"
              className="newsletter__button"
              disabled={state.status === 'loading'}
            >
              {state.status === 'loading' ? '...' : t.button}
            </button>
          </form>

          {state.message && (
            <p className={`newsletter__message newsletter__message--${state.status}`}>
              {state.message}
            </p>
          )}

          <p className="newsletter__no-spam">
            {t.noSpam}
            <br />
            <span className="newsletter__no-spam-sub">{t.noSpamSub}</span>
          </p>
        </div>
      </div>

      <div className="newsletter__decoration">
        <div className="newsletter__line"></div>
      </div>
    </section>
  )
}

export default Newsletter
