import { Metadata } from 'next'
import CertificationsClient from './CertificationsClient'
import { getCertifications } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Certifications | Vaibhav Suman',
  description: 'Professional certifications and credentials earned throughout my career in software development, cloud computing, and technology.',
  keywords: ['certifications', 'credentials', 'professional development', 'AWS', 'cloud computing', 'software development'],
  openGraph: {
    title: 'Certifications | Vaibhav Suman',
    description: 'Professional certifications and credentials earned throughout my career in software development, cloud computing, and technology.',
    type: 'website',
  },
}

export default async function CertificationsPage() {
  const certifications = await getCertifications()

  return <CertificationsClient certifications={certifications} />
}