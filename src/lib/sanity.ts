import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-01'
const token = process.env.SANITY_TOKEN

if (!projectId || !dataset) {
  throw new Error('Missing Sanity project ID or dataset')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries for fetching data
export const queries = {
  // Skills
  skills: `*[_type == "skill"] | order(order asc, name asc) {
    _id,
    name,
    category,
    level,
    icon,
    order
  }`,

  // Projects
  projects: `*[_type == "project"] | order(order asc, startDate desc) {
    _id,
    title,
    slug,
    description,
    longDescription,
    technologies,
    category,
    githubLink,
    demoLink,
    image,
    featured,
    status,
    startDate,
    endDate,
    order
  }`,

  featuredProjects: `*[_type == "project" && featured == true] | order(order asc, startDate desc) {
    _id,
    title,
    slug,
    description,
    technologies,
    category,
    githubLink,
    demoLink,
    image,
    startDate,
    endDate
  }`,

  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    technologies,
    category,
    githubLink,
    demoLink,
    image,
    featured,
    status,
    startDate,
    endDate
  }`,

  // Publications
  publications: `*[_type == "publication"] | order(date desc) {
    _id,
    title,
    authors,
    journal,
    abstract,
    keywords,
    link,
    doi,
    pdfFile,
    date,
    type,
    status,
    featured
  }`,

  featuredPublications: `*[_type == "publication" && featured == true] | order(date desc) {
    _id,
    title,
    authors,
    journal,
    link,
    date,
    type
  }`,

  // Blog posts
  blogPosts: `*[_type == "blogPost" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    categories,
    tags,
    publishedAt,
    author,
    readingTime,
    featured
  }`,

  featuredBlogPosts: `*[_type == "blogPost" && published == true && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    categories,
    publishedAt,
    readingTime
  }`,

  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    categories,
    tags,
    publishedAt,
    updatedAt,
    author,
    readingTime,
    seo
  }`,

  blogCategories: `*[_type == "blogPost" && published == true] | order(publishedAt desc) {
    categories
  }`,

  // Experience
  experience: `*[_type == "experience"] | order(order asc, startDate desc) {
    _id,
    company,
    position,
    location,
    employmentType,
    startDate,
    endDate,
    current,
    description,
    achievements,
    technologies,
    companyLogo,
    companyWebsite,
    order
  }`,

  // Certifications
  certifications: `*[_type == "certification"] | order(order asc, issueDate desc) {
    _id,
    name,
    issuer,
    description,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    certificateFile,
    skills,
    category,
    level,
    logo,
    featured,
    order
  }`,

  featuredCertifications: `*[_type == "certification" && featured == true] | order(order asc, issueDate desc) {
    _id,
    name,
    issuer,
    issueDate,
    credentialUrl,
    logo
  }`,
}

// Helper functions for data fetching
export async function getSkills() {
  return await client.fetch(queries.skills)
}

export async function getProjects() {
  return await client.fetch(queries.projects)
}

export async function getFeaturedProjects() {
  return await client.fetch(queries.featuredProjects)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(queries.projectBySlug, { slug })
}

export async function getPublications() {
  return await client.fetch(queries.publications)
}

export async function getFeaturedPublications() {
  return await client.fetch(queries.featuredPublications)
}

export async function getBlogPosts() {
  return await client.fetch(queries.blogPosts)
}

export async function getFeaturedBlogPosts() {
  return await client.fetch(queries.featuredBlogPosts)
}

export async function getBlogPostBySlug(slug: string) {
  return await client.fetch(queries.blogPostBySlug, { slug })
}

interface BlogPostWithCategories {
  categories?: string[]
}

export async function getBlogCategories() {
  const posts: BlogPostWithCategories[] = await client.fetch(queries.blogCategories)
  const categories = new Set<string>()
  posts.forEach((post) => {
    post.categories?.forEach((category: string) => categories.add(category))
  })
  return Array.from(categories)
}

export async function getExperience() {
  return await client.fetch(queries.experience)
}

export async function getCertifications() {
  return await client.fetch(queries.certifications)
}

export async function getFeaturedCertifications() {
  return await client.fetch(queries.featuredCertifications)
}

interface ContactMessageData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  projectType?: string
  budget?: string
  timeline?: string
}

// Contact form submission
export async function submitContactMessage(data: ContactMessageData) {
  return await client.create({
    _type: 'contactMessage',
    ...data,
    submittedAt: new Date().toISOString(),
  })
}