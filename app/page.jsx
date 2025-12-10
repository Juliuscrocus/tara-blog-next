'use client'

import Hero from '@/components/Hero'
import About from '@/components/About'
import Articles from '@/components/Articles'
import CafesWrapper from '@/components/CafesWrapper'
import Newsletter from '@/components/Newsletter'
import Social from '@/components/Social'

export default function Home() {
  return (
    <main className="app">
      <Hero />
      <About />
      <Articles />
      <CafesWrapper />
      <Newsletter />
      <Social />
    </main>
  )
}
