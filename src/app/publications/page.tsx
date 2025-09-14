import { Metadata } from 'next'
import { Suspense } from 'react'
import PublicationsClient from './PublicationsClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Publications | Your Name - Research & Academic Work',
  description: 'Explore my research publications, academic papers, and contributions to the scientific community. Featuring peer-reviewed articles, conference proceedings, and collaborative research.',
  keywords: [
    'research publications',
    'academic papers',
    'peer-reviewed articles',
    'scientific research',
    'conference proceedings',
    'research collaboration',
    'academic contributions',
    'scholarly work'
  ],
  openGraph: {
    title: 'Publications | Your Name - Research & Academic Work',
    description: 'Explore my research publications, academic papers, and contributions to the scientific community.',
    type: 'website',
    images: [
      {
        url: '/og-publications.jpg',
        width: 1200,
        height: 630,
        alt: 'Research Publications and Academic Work'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publications | Your Name - Research & Academic Work',
    description: 'Explore my research publications, academic papers, and contributions to the scientific community.',
    images: ['/og-publications.jpg']
  }
}

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Suspense fallback={<LoadingSpinner />}>
        <PublicationsClient />
      </Suspense>
    </main>
  )
}