import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

interface SanityDocument {
  slug: {
    current: string
  }
  _updatedAt: string
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.example.com'

export async function GET() {
  try {
    // Fetch dynamic content for sitemap
    const [projects, publications, blogPosts] = await Promise.all([
      client.fetch('*[_type == "project" && !(_id in path("drafts.**"))] | order(_createdAt desc)'),
      client.fetch('*[_type == "publication" && !(_id in path("drafts.**"))] | order(publishedAt desc)'),
      client.fetch('*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc)')
    ])

    // Static pages
    const staticPages = [
      '',
      '/about',
      '/projects',
      '/publications',
      '/certifications',
      '/blog',
      '/contact'
    ]

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${projects.map((project: SanityDocument) => `  <url>
    <loc>${baseUrl}/projects/${project.slug.current}</loc>
    <lastmod>${new Date(project._updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
${publications.map((publication: SanityDocument) => `  <url>
    <loc>${baseUrl}/publications/${publication.slug.current}</loc>
    <lastmod>${new Date(publication._updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
${blogPosts.map((post: SanityDocument) => `  <url>
    <loc>${baseUrl}/blog/${post.slug.current}</loc>
    <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Sitemap generation failed:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}