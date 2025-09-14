import { Metadata } from 'next'
import { Suspense } from 'react'
import ExperienceClient from './ExperienceClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Experience | Your Name - Professional Journey & Career Timeline',
  description: 'Explore my professional journey, work experience, and career milestones. Detailed timeline of roles, achievements, and contributions across various organizations and projects.',
  keywords: [
    'work experience',
    'career timeline',
    'professional journey',
    'job history',
    'achievements',
    'career milestones',
    'professional development',
    'work portfolio'
  ],
  openGraph: {
    title: 'Experience | Your Name - Professional Journey & Career Timeline',
    description: 'Explore my professional journey, work experience, and career milestones.',
    type: 'website',
    images: [
      {
        url: '/og-experience.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Experience and Career Timeline'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Your Name - Professional Journey & Career Timeline',
    description: 'Explore my professional journey, work experience, and career milestones.',
    images: ['/og-experience.jpg']
  }
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Suspense fallback={<LoadingSpinner />}>
        <ExperienceClient />
      </Suspense>
    </main>
  )
}