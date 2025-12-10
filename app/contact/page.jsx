'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import './contact.css'

const WEB3FORMS_KEY = '894d4cbc-a55f-40d1-87a5-fc1a9615bb13'

export default function ContactPage() {
  const { lang } = useLanguage()
  const [formState, setFormState] = useState({ status: 'idle', message: '' })

  const content = {
    fr: {
      label: 'Contact',
      title: 'Échangeons',
      subtitle: 'ensemble',
      intro: 'Une question, une suggestion d\'adresse, une collaboration ? Je serais ravie d\'échanger avec toi.',
      form: {
        name: 'Ton prénom',
        email: 'Ton email',
        subject: 'Sujet',
        subjectOptions: [
          { value: '', label: 'Choisis un sujet' },
          { value: 'question', label: 'Question générale' },
          { value: 'address', label: 'Suggestion d\'adresse' },
          { value: 'collab', label: 'Collaboration / Partenariat' },
          { value: 'other', label: 'Autre' }
        ],
        message: 'Ton message',
        send: 'Envoyer',
        success: 'Message envoyé ! Je te réponds très vite.',
        error: 'Oups, une erreur. Réessaie ou contacte-moi sur Instagram.'
      },
      social: {
        title: 'Ou retrouve-moi sur',
        instagram: 'Instagram',
        tiktok: 'TikTok'
      }
    },
    en: {
      label: 'Contact',
      title: 'Let\'s',
      subtitle: 'connect',
      intro: 'A question, an address suggestion, a collaboration? I\'d love to hear from you.',
      form: {
        name: 'Your name',
        email: 'Your email',
        subject: 'Subject',
        subjectOptions: [
          { value: '', label: 'Choose a subject' },
          { value: 'question', label: 'General question' },
          { value: 'address', label: 'Address suggestion' },
          { value: 'collab', label: 'Collaboration / Partnership' },
          { value: 'other', label: 'Other' }
        ],
        message: 'Your message',
        send: 'Send',
        success: 'Message sent! I\'ll get back to you soon.',
        error: 'Oops, an error occurred. Try again or contact me on Instagram.'
      },
      social: {
        title: 'Or find me on',
        instagram: 'Instagram',
        tiktok: 'TikTok'
      }
    }
  }

  const t = content[lang]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState({ status: 'loading', message: '' })

    const formData = new FormData(e.target)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('from_name', 'Entre Deux - Contact')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormState({ status: 'success', message: t.form.success })
        e.target.reset()
      } else {
        throw new Error()
      }
    } catch (error) {
      setFormState({ status: 'error', message: t.form.error })
    }
  }

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-page__hero">
        <div className="contact-page__hero-content">
          <span className="contact-page__label">{t.label}</span>
          <h1 className="contact-page__title">
            {t.title}
            <br />
            <em>{t.subtitle}</em>
          </h1>
          <p className="contact-page__intro">{t.intro}</p>
        </div>
      </section>

      {/* Content */}
      <section className="contact-page__content">
        <div className="contact-page__grid">
          {/* Form */}
          <div className="contact-page__form-wrapper">
            <form className="contact-page__form" onSubmit={handleSubmit}>
              <input
                type="checkbox"
                name="botcheck"
                className="contact-page__honeypot"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="contact-page__field">
                <input
                  type="text"
                  name="name"
                  placeholder={t.form.name}
                  className="contact-page__input"
                  required
                  disabled={formState.status === 'loading'}
                />
              </div>

              <div className="contact-page__field">
                <input
                  type="email"
                  name="email"
                  placeholder={t.form.email}
                  className="contact-page__input"
                  required
                  disabled={formState.status === 'loading'}
                />
              </div>

              <div className="contact-page__field">
                <select
                  name="subject"
                  className="contact-page__select"
                  required
                  disabled={formState.status === 'loading'}
                >
                  {t.form.subjectOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="contact-page__field">
                <textarea
                  name="message"
                  placeholder={t.form.message}
                  className="contact-page__textarea"
                  rows="6"
                  required
                  disabled={formState.status === 'loading'}
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-page__submit"
                disabled={formState.status === 'loading'}
              >
                {formState.status === 'loading' ? '...' : t.form.send}
              </button>

              {formState.message && (
                <p className={`contact-page__message contact-page__message--${formState.status}`}>
                  {formState.message}
                </p>
              )}
            </form>
          </div>

          {/* Social */}
          <div className="contact-page__social">
            <h2 className="contact-page__social-title">{t.social.title}</h2>
            <div className="contact-page__social-links">
              <a
                href="https://instagram.com/tarascoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__social-link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                <span>{t.social.instagram}</span>
                <span className="contact-page__social-handle">@tarascoffee</span>
              </a>
              <a
                href="https://tiktok.com/@tarascoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__social-link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                  <path d="M9 12a4 4 0 1 0 4 4V6a5 5 0 0 0 5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{t.social.tiktok}</span>
                <span className="contact-page__social-handle">@tarascoffee</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
