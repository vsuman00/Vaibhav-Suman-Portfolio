import { Metadata } from 'next'
import { Suspense } from 'react'
import BlogClient from './BlogClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Blog | Your Name - Thoughts on Technology & Development',
  description: 'Read my latest thoughts on web development, AI, technology trends, and software engineering best practices.',
  openGraph: {
    title: 'Blog | Your Name - Thoughts on Technology & Development',
    description: 'Read my latest thoughts on web development, AI, technology trends, and software engineering best practices.',
    type: 'website',
    url: '/blog',
    images: [
      {
        url: '/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog - Your Name'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Your Name - Thoughts on Technology & Development',
    description: 'Read my latest thoughts on web development, AI, technology trends, and software engineering best practices.',
    images: ['/og-blog.jpg']
  },
  keywords: [
    'blog',
    'web development',
    'artificial intelligence',
    'technology',
    'programming',
    'software engineering',
    'tutorials',
    'tech insights'
  ]
}

export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading blog posts..." />}>
      <BlogClient />
    </Suspense>
  )
}