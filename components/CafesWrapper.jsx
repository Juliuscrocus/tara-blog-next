'use client'

import { useEffect, useState } from 'react'

export default function CafesWrapper() {
  const [CafesComponent, setCafesComponent] = useState(null)

  useEffect(() => {
    // Only import on client side
    import('./Cafes').then((mod) => {
      setCafesComponent(() => mod.default)
    })
  }, [])

  if (!CafesComponent) {
    return <div style={{ minHeight: '100vh', background: 'var(--color-bg-warm)' }} />
  }

  return <CafesComponent />
}
