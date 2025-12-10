'use client'

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Social.css'

// Web3Forms - 100% gratuit, illimité
// 1. Va sur https://web3forms.com
// 2. Entre ton email et récupère ton Access Key
// 3. Remplace YOUR_ACCESS_KEY ci-dessous
const WEB3FORMS_KEY = '894d4cbc-a55f-40d1-87a5-fc1a9615bb13'

const InstagramIcon = () => (
  <svg className="social__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const TikTokIcon = () => (
  <svg className="social__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M9 12a4 4 0 1 0 4 4V6a5 5 0 0 0 5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Social = () => {
  const { lang, t } = useLanguage()
  const sectionRef = useScrollReveal()
  const [formState, setFormState] = useState({ status: 'idle', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState({ status: 'loading', message: '' })

    const formData = new FormData(e.target)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', 'Nouveau message - Entre Deux Blog')
    formData.append('from_name', 'Entre Deux Blog')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormState({
          status: 'success',
          message: lang === 'fr' ? 'Message envoyé !' : 'Message sent!',
        })
        e.target.reset()
      } else {
        throw new Error(data.message || 'Form submission failed')
      }
    } catch (error) {
      setFormState({
        status: 'error',
        message: lang === 'fr' ? 'Erreur, réessaie.' : 'Error, please retry.',
      })
    }
  }

  const contactLabels = {
    fr: {
      sectionLabel: 'Restons en contact',
      sectionTitle: 'Échangeons',
      sectionSubtitle: 'ensemble',
      findMe: 'Retrouve-moi',
      onSocial: 'sur les réseaux',
      socialText: 'Des vidéos de coffee spots et des moments spontanés.',
      contactMe: 'Me contacter',
      contactText: 'Une question, une collaboration, ou juste envie de discuter café ?',
      namePlaceholder: 'Ton prénom',
      emailPlaceholder: 'ton@email.com',
      messagePlaceholder: 'Ton message...',
      send: 'Envoyer',
    },
    en: {
      sectionLabel: 'Let\'s connect',
      sectionTitle: 'Get in',
      sectionSubtitle: 'touch',
      findMe: 'Find me',
      onSocial: 'on social media',
      socialText: 'Coffee spot videos and spontaneous moments.',
      contactMe: 'Contact me',
      contactText: 'A question, a collaboration, or just want to chat about coffee?',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Your message...',
      send: 'Send',
    },
  }

  const ct = contactLabels[lang]

  return (
    <section className="social" id="contact" ref={sectionRef}>
      <div className="social__inner">
        {/* Section Header */}
        <div className="social__header reveal">
          <span className="social__label">{ct.sectionLabel}</span>
          <h2 className="social__section-title">
            {ct.sectionTitle}
            <br />
            <em>{ct.sectionSubtitle}</em>
          </h2>
        </div>

        <div className="social__grid">
        {/* Social Links */}
        <div className="social__column reveal">
          <h2 className="social__title">
            {ct.findMe}
            <br />
            <em>{ct.onSocial}</em>
          </h2>
          <p className="social__text">{ct.socialText}</p>

          <div className="social__links">
            <a
              href="https://instagram.com/tarascoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="social__link"
            >
              <span className="social__link-name">Instagram</span>
              <span className="social__link-handle">@tarascoffee</span>
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com/@tarascoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="social__link"
            >
              <span className="social__link-name">TikTok</span>
              <span className="social__link-handle">@tarascoffee</span>
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="social__divider"></div>

        {/* Contact Form */}
        <div className="social__column reveal reveal-delay-1">
          <h2 className="social__title">
            {ct.contactMe}
          </h2>
          <p className="social__text">{ct.contactText}</p>

          <form className="social__form" onSubmit={handleSubmit}>
            {/* Honeypot anti-spam - invisible pour les humains */}
            <input
              type="checkbox"
              name="botcheck"
              className="social__honeypot"
              tabIndex={-1}
              autoComplete="off"
            />
            <input
              type="text"
              name="name"
              placeholder={ct.namePlaceholder}
              className="social__input"
              required
              disabled={formState.status === 'loading'}
            />
            <input
              type="email"
              name="email"
              placeholder={ct.emailPlaceholder}
              className="social__input"
              required
              disabled={formState.status === 'loading'}
            />
            <textarea
              name="message"
              placeholder={ct.messagePlaceholder}
              className="social__textarea"
              rows="4"
              required
              disabled={formState.status === 'loading'}
            ></textarea>
            <button
              type="submit"
              className="social__submit"
              disabled={formState.status === 'loading'}
            >
              {formState.status === 'loading'
                ? '...'
                : ct.send}
            </button>
            {formState.message && (
              <p className={`social__form-message social__form-message--${formState.status}`}>
                {formState.message}
              </p>
            )}
          </form>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Social
