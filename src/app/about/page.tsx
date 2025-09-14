import { Metadata } from 'next'
import { Suspense } from 'react'
import AboutClient from './AboutClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'About Me | Portfolio',
  description: 'Learn more about my background, skills, experience, and passion for technology and innovation.',
  openGraph: {
    title: 'About Me | Portfolio',
    description: 'Learn more about my background, skills, experience, and passion for technology and innovation.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me | Portfolio',
    description: 'Learn more about my background, skills, experience, and passion for technology and innovation.'
  }
}

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading about page..." />}>
      <AboutClient />
    </Suspense>
  )
}