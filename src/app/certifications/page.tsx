import { Metadata } from 'next'
import CertificationsClient from './CertificationsClient'
import { getCertifications } from '@/lib/sanity'
import path from 'path'
import fs from 'fs'

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

  // Load external certificates from certificate.json and resolve image paths in /public/images/certificate
  type ExternalCert = {
    name: string
    desc: string
    image: string
    category: string
    links: { view: string }
    imageSrc: string
  }

  type CertificateData = {
    name: string
    desc: string
    image: string
    category: string
    links: { view: string }
  }

  let externalCerts: ExternalCert[] = []
  try {
    const jsonPath = path.join(process.cwd(), 'certificate.json')
    const raw = fs.readFileSync(jsonPath, 'utf-8')
    const data = JSON.parse(raw) as CertificateData[]

    externalCerts = data.map((item) => {
      const baseDir = path.join(process.cwd(), 'public', 'images', 'certificate')
      const png = path.join(baseDir, `${item.image}.png`)
      const jpg = path.join(baseDir, `${item.image}.jpg`)
      const imageSrc = fs.existsSync(png)
        ? `/images/certificate/${item.image}.png`
        : fs.existsSync(jpg)
        ? `/images/certificate/${item.image}.jpg`
        : `/images/certificate/${item.image}`

      return {
        name: item.name,
        desc: item.desc,
        image: item.image,
        category: item.category,
        links: item.links,
        imageSrc,
      } as ExternalCert
    })
  } catch {
    externalCerts = []
  }

  return <CertificationsClient certifications={certifications} externalCerts={externalCerts} />
}