'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

const About = () => {
  const { t } = useLanguage()
  const sectionRef = useScrollReveal()
  const imagesRef = useRef(null)

  // Parallax effect on image (subtle)
  useEffect(() => {
    const handleScroll = () => {
      if (!imagesRef.current) return
      const rect = imagesRef.current.getBoundingClientRect()
      const scrolled = window.scrollY

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const img = imagesRef.current.querySelector('.about__img')
        if (img) {
          const speed = 0.05
          const offset = (scrolled - rect.top) * speed
          img.style.transform = `translateY(${offset}px)`
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__layout">
        <div className="about__content">
          <span className="about__label reveal">{t.about.label}</span>
          <h2 className="about__title reveal reveal-delay-1">
            {t.about.title1}
            <br />
            <em>{t.about.title2}</em>
          </h2>
          <div className="about__text reveal reveal-delay-2">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
          <div className="about__signature reveal reveal-delay-3">
            {t.about.signature}
          </div>
        </div>

        <div className="about__visual" ref={imagesRef}>
          <div className="about__img about__img--portrait">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000"
              alt="Portrait Tara"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
