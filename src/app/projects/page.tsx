import { Metadata } from 'next'
import { Suspense } from 'react'
import ProjectsClient from './ProjectsClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Explore my portfolio of projects spanning AI/ML, web development, mobile applications, and research initiatives.',
  openGraph: {
    title: 'Projects | Portfolio',
    description: 'Explore my portfolio of projects spanning AI/ML, web development, mobile applications, and research initiatives.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Portfolio',
    description: 'Explore my portfolio of projects spanning AI/ML, web development, mobile applications, and research initiatives.',
  },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-20">
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading projects..." />}>
        <ProjectsClient />
      </Suspense>
    </div>
  )
}