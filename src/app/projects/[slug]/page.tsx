import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ProjectClient from './ProjectClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { generateProjectMetadata, generateStructuredData } from '@/lib/seo'

// Mock project data - replace with actual data fetching
const mockProjects = [
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.',
    longDescription: 'A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern web technologies and best practices.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    githubUrl: 'https://github.com/johndoe/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.johndoe.dev',
    featured: true,
    completedAt: '2024-01-20',
    category: 'Web Development',
    challenges: [
      'Implementing secure payment processing with Stripe',
      'Optimizing database queries for large product catalogs',
      'Building responsive design for mobile commerce'
    ],
    features: [
      'User authentication and authorization',
      'Product catalog with search and filtering',
      'Shopping cart and checkout process',
      'Order management system',
      'Admin dashboard for inventory management'
    ]
  },
  {
    slug: 'task-management-app',
    title: 'Task Management Application',
    description: 'A collaborative task management tool with real-time updates and team collaboration features.',
    longDescription: 'Built with React, Node.js, and Socket.io for real-time collaboration. Features include drag-and-drop task boards, team management, and progress tracking.',
    image: '/projects/task-manager.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/johndoe/task-manager',
    liveUrl: 'https://tasks.johndoe.dev',
    featured: true,
    completedAt: '2024-01-15',
    category: 'Web Development',
    challenges: [
      'Implementing real-time synchronization across multiple clients',
      'Designing intuitive drag-and-drop interfaces',
      'Managing complex state in collaborative environments'
    ],
    features: [
      'Real-time collaboration with Socket.io',
      'Drag-and-drop task boards',
      'Team management and permissions',
      'Progress tracking and analytics',
      'Mobile-responsive design'
    ]
  },
  {
    slug: 'ai-content-generator',
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool using OpenAI API for creating blog posts and marketing copy.',
    longDescription: 'A sophisticated content generation platform that leverages AI to create high-quality blog posts, marketing copy, and social media content.',
    image: '/projects/ai-generator.jpg',
    technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/johndoe/ai-content-generator',
    liveUrl: 'https://ai-content.johndoe.dev',
    featured: false,
    completedAt: '2024-01-10',
    category: 'AI/ML',
    challenges: [
      'Integrating OpenAI API efficiently',
      'Managing API rate limits and costs',
      'Creating intuitive content editing interfaces'
    ],
    features: [
      'AI-powered content generation',
      'Multiple content types (blog, social, marketing)',
      'Content editing and refinement tools',
      'Template management system',
      'Usage analytics and tracking'
    ]
  }
]

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = mockProjects.find(p => p.slug === slug)
  
  if (!project) {
    return {
      title: 'Project Not Found | John Doe Portfolio',
      description: 'The requested project could not be found.'
    }
  }

  return generateProjectMetadata(project)
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = mockProjects.find(p => p.slug === slug)
  
  if (!project) {
    notFound()
  }

  // Generate structured data for the project
  const projectStructuredData = generateStructuredData('website', {
    title: project.title,
    description: project.description,
    image: project.image,
    url: `https://johndoe.dev/projects/${project.slug}`,
    technologies: project.technologies,
    completedDate: project.completedAt,
    category: project.category,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl
  })

  return (
    <>
      {/* Structured Data for Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData),
        }}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectClient project={project} />
      </Suspense>
    </>
  )
}

// Generate static params for all projects
export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    slug: project.slug,
  }))
}