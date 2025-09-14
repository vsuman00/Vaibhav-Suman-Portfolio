import { MetadataRoute } from 'next'
import { generateSitemapUrls } from '@/lib/seo'

// Mock data for dynamic routes - in a real app, this would come from your CMS or database
const mockBlogPosts = [
  { slug: 'getting-started-with-nextjs-14', updatedAt: '2024-01-15' },
  { slug: 'building-scalable-react-applications', updatedAt: '2024-01-10' },
  { slug: 'typescript-best-practices', updatedAt: '2024-01-05' },
  { slug: 'modern-css-techniques', updatedAt: '2023-12-20' },
  { slug: 'api-design-principles', updatedAt: '2023-12-15' }
]

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
  
  // Dynamic blog post URLs
  const blogUrls = mockBlogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))
  
  // Dynamic project URLs
  const projectUrls = mockProjects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))
  
  return [
    ...staticUrls,
    ...blogUrls,
    ...projectUrls
  ]
}

// Alternative function for generating sitemap with real data
// Uncomment and modify when you have actual data sources
/*
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://johndoe.dev'
  
  // Fetch blog posts from your CMS/database
  // const blogPosts = await getBlogPosts()
  // const projects = await getProjects()
  
  const staticUrls = generateSitemapUrls()
  
  const blogUrls = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))
  
  const projectUrls = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))
  
  return [
    ...staticUrls,
    ...blogUrls,
    ...projectUrls
  ]
}
*/