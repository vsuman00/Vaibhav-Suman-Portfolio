import { Metadata } from 'next'
import { Suspense } from 'react'
import ContactClient from './ContactClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Contact Me | Your Name',
  description: 'Get in touch with me for collaborations, opportunities, or just to say hello. I\'d love to hear from you!',
  openGraph: {
    title: 'Contact Me | Your Name',
    description: 'Get in touch with me for collaborations, opportunities, or just to say hello. I\'d love to hear from you!',
    type: 'website',
    url: '/contact',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Me'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Me | Your Name',
    description: 'Get in touch with me for collaborations, opportunities, or just to say hello. I\'d love to hear from you!',
    images: ['/og-contact.jpg']
  },
  keywords: [
    'contact',
    'get in touch',
    'collaboration',
    'hire developer',
    'freelance',
    'consultation',
    'project inquiry'
  ]
}

export default function ContactPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading contact form..." />}>
      <ContactClient />
    </Suspense>
  )
}