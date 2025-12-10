'use client'

import { useRouter } from 'next/navigation'

export default function ScrollLink({ href, children, onClick, className }) {
  const router = useRouter()

  const handleClick = (e) => {
    // Si c'est un lien avec hash (#)
    if (href.includes('#')) {
      const [path, hash] = href.split('#')

      // Si on est déjà sur la bonne page (ou path vide = page actuelle)
      if (!path || window.location.pathname === path) {
        e.preventDefault()
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Changement de page + scroll
        e.preventDefault()
        router.push(path || '/')
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }

    if (onClick) onClick()
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
