import { MetadataRoute } from 'next'
import { generateSitemapUrls } from '@/lib/seo'

// Mock data for dynamic routes - in a real app, this would come from your CMS or database

const mockProjects = [
  { slug: 'ecommerce-platform', updatedAt: '2024-01-12' },
  { slug: 'task-management-app', updatedAt: '2024-01-08' },
  { slug: 'weather-dashboard', updatedAt: '2024-01-03' },
  { slug: 'social-media-analytics', updatedAt: '2023-12-25' },
  { slug: 'portfolio-website', updatedAt: '2023-12-18' }
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://johndoe.dev' // Replace with your actual domain
  
  // Static pages
  const staticUrls = generateSitemapUrls()
  
  // Dynamic project URLs
  const projectUrls = mockProjects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))
  
  return [
    ...staticUrls,
    ...projectUrls
  ]
}

// Alternative function for generating sitemap with real data
// Uncomment and modify when you have actual data sources
/*
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://johndoe.dev'
  
  // const projects = await getProjects()
  
  const staticUrls = generateSitemapUrls()
  
  const projectUrls = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))
  
  return [
    ...staticUrls,
    ...projectUrls
  ]
}
*/