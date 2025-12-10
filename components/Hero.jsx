'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

const Hero = () => {
  const { t } = useLanguage()
  const imagesRef = useRef(null)

  // Parallax effect on images (using CSS variable to not conflict with hover transforms)
  useEffect(() => {
    const handleScroll = () => {
      if (!imagesRef.current) return
      const scrolled = window.scrollY
      const images = imagesRef.current.querySelectorAll('.hero__img')

      images.forEach((img, index) => {
        const speed = 0.1 + index * 0.05
        img.style.setProperty('--parallax-y', `${scrolled * speed}px`)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero">
      <div className="hero__images" ref={imagesRef}>
        {/* Premier plan : Café */}
        <div className="hero__img hero__img--main">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=900&auto=format&fit=crop"
            alt="Coffee"
            loading="eager"
          />
        </div>
        {/* Milieu : Champagne */}
        <div className="hero__img hero__img--secondary">
          <img
            src="https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&h=700&auto=format&fit=crop"
            alt="Champagne"
            loading="eager"
          />
        </div>
        {/* Arrière : Gastronomie (plus visible) */}
        <div className="hero__img hero__img--accent">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=450&h=550&auto=format&fit=crop"
            alt="Gastronomy"
            loading="eager"
          />
        </div>
      </div>

      <div className="hero__content">
        <span className="hero__label">{t.hero.label}</span>
        <h1 className="hero__title">
          {t.hero.title1}
          <br />
          <em>{t.hero.title2}</em>
        </h1>
        <p className="hero__intro">{t.hero.intro}</p>
      </div>

      <div className="hero__scroll">
        <span>{t.hero.scroll}</span>
      </div>
    </section>
  )
}

export default Hero
