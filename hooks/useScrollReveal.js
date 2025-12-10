'use client'

import { useEffect, useRef } from 'react'

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            if (options.once !== false) {
              observer.unobserve(entry.target)
            }
          } else if (options.once === false) {
            entry.target.classList.remove('revealed')
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    const elements = element.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.once])

  return ref
}

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * speed

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}
