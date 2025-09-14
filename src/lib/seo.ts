import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  author?: string
  url?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  locale?: string
  alternateLocales?: string[]
}

const defaultSEO: SEOConfig = {
  title: 'John Doe - Full Stack Developer & Software Engineer',
  description: 'Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable applications and delivering exceptional user experiences.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Node.js Developer',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'Software Development',
    'Web Applications',
    'API Development',
    'Database Design',
    'Cloud Computing',
    'DevOps',
    'Agile Development'
  ],
  author: 'John Doe',
  url: 'https://johndoe.dev',
  image: 'https://johndoe.dev/og-image.jpg',
  type: 'website',
  locale: 'en_US'
}

export function generateMetadata(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config }
  
  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    authors: seo.author ? [{ name: seo.author }] : undefined,
    creator: seo.author,
    publisher: seo.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: seo.url ? new URL(seo.url) : undefined,
    alternates: {
      canonical: seo.url,
      languages: seo.alternateLocales ? 
        Object.fromEntries(seo.alternateLocales.map(locale => [locale, `${seo.url}/${locale}`])) : 
        undefined
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.url,
      siteName: 'John Doe Portfolio',
      images: seo.image ? [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: seo.title,
        }
      ] : undefined,
      locale: seo.locale,
      type: seo.type || 'website',
      publishedTime: seo.publishedTime,
      modifiedTime: seo.modifiedTime,
      section: seo.section,
      tags: seo.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      creator: '@johndoe_dev', // Replace with actual Twitter handle
      images: seo.image ? [seo.image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Replace with actual verification code
      yandex: 'your-yandex-verification-code', // Replace with actual verification code
      yahoo: 'your-yahoo-verification-code', // Replace with actual verification code
    },
  }

  return metadata
}

export function generateStructuredData(type: 'person' | 'website' | 'article' | 'breadcrumb', data: any) {
  const baseUrl = defaultSEO.url
  
  switch (type) {
    case 'person':
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name || 'John Doe',
        jobTitle: data.jobTitle || 'Full Stack Developer',
        description: data.description || defaultSEO.description,
        url: data.url || baseUrl,
        image: data.image || defaultSEO.image,
        email: data.email || 'john@johndoe.dev',
        telephone: data.telephone,
        address: data.address ? {
          '@type': 'PostalAddress',
          addressLocality: data.address.city,
          addressRegion: data.address.state,
          addressCountry: data.address.country
        } : undefined,
        sameAs: data.socialLinks || [
          'https://linkedin.com/in/johndoe',
          'https://github.com/johndoe',
          'https://twitter.com/johndoe_dev'
        ],
        knowsAbout: data.skills || [
          'JavaScript',
          'TypeScript',
          'React',
          'Node.js',
          'Python',
          'Web Development',
          'Software Engineering'
        ],
        alumniOf: data.education,
        worksFor: data.currentEmployer
      }

    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: data.name || 'John Doe Portfolio',
        description: data.description || defaultSEO.description,
        url: data.url || baseUrl,
        author: {
          '@type': 'Person',
          name: data.authorName || 'John Doe'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Person',
          name: data.author || 'John Doe',
          url: baseUrl
        },
        publisher: {
          '@type': 'Organization',
          name: 'John Doe Portfolio',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`
          }
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        keywords: data.keywords,
        articleSection: data.section,
        wordCount: data.wordCount
      }

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }

    default:
      return null
  }
}

export function generateBlogPostMetadata(post: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  tags?: string[]
  author?: string
  image?: string
  readingTime?: number
}): Metadata {
  const url = `${defaultSEO.url}/blog/${post.slug}`
  
  return generateMetadata({
    title: `${post.title} | John Doe Blog`,
    description: post.description,
    url,
    image: post.image || `${defaultSEO.url}/api/og?title=${encodeURIComponent(post.title)}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    section: 'Technology',
    tags: post.tags,
    keywords: [
      ...defaultSEO.keywords || [],
      ...(post.tags || []),
      'Blog',
      'Tutorial',
      'Tech Article'
    ]
  })
}

export function generateProjectMetadata(project: {
  title: string
  description: string
  slug: string
  technologies?: string[]
  image?: string
}): Metadata {
  const url = `${defaultSEO.url}/projects/${project.slug}`
  
  return generateMetadata({
    title: `${project.title} | John Doe Projects`,
    description: project.description,
    url,
    image: project.image || `${defaultSEO.url}/api/og?title=${encodeURIComponent(project.title)}&type=project`,
    type: 'website',
    keywords: [
      ...defaultSEO.keywords || [],
      ...(project.technologies || []),
      'Project',
      'Portfolio',
      'Case Study'
    ]
  })
}

// Sitemap generation helper
export function generateSitemapUrls() {
  const baseUrl = defaultSEO.url
  const staticPages = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/experience',
    '/publications'
  ]
  
  return staticPages.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority: path === '' ? 1.0 : 0.8
  }))
}

// Robots.txt generation helper
export function generateRobotsTxt() {
  const baseUrl = defaultSEO.url
  
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`
}

export { defaultSEO }