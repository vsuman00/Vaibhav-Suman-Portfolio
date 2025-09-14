'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Calendar, Users, Star, ArrowRight } from 'lucide-react'

import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  startDate: string
  endDate?: string
  teamSize: number
  stars?: number
  highlights: string[]
}

// Mock data - in real app, this would come from Sanity
const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Research Assistant',
    description: 'An intelligent research assistant that helps academics find, analyze, and synthesize research papers using advanced NLP and machine learning.',
    longDescription: 'A comprehensive research platform that leverages GPT-4 and custom ML models to assist researchers in literature review, paper analysis, and knowledge synthesis.',
    image: '/images/projects/research-assistant.jpg',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'AI/ML',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/username/research-assistant',
    liveUrl: 'https://research-assistant.demo.com',
    startDate: '2023-06',
    endDate: '2024-01',
    teamSize: 3,
    stars: 245,
    highlights: [
      'Processes 10,000+ research papers',
      '95% accuracy in paper classification',
      'Reduces research time by 60%'
    ]
  },
  {
    id: '2',
    title: 'Real-time Collaboration Platform',
    description: 'A modern collaboration platform with real-time editing, video conferencing, and project management features for distributed teams.',
    longDescription: 'Built with WebRTC, WebSockets, and modern React patterns to provide seamless real-time collaboration experience.',
    image: '/images/projects/collaboration-platform.jpg',
    technologies: ['React', 'Node.js', 'WebRTC', 'Socket.io', 'MongoDB', 'Redis', 'AWS'],
    category: 'Web Development',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/username/collab-platform',
    liveUrl: 'https://collab-platform.demo.com',
    startDate: '2023-03',
    endDate: '2023-08',
    teamSize: 5,
    stars: 189,
    highlights: [
      'Supports 1000+ concurrent users',
      'Sub-100ms latency globally',
      '99.9% uptime SLA'
    ]
  },
  {
    id: '3',
    title: 'Mobile Health Tracker',
    description: 'A comprehensive health tracking mobile app with AI-powered insights, wearable integration, and personalized recommendations.',
    longDescription: 'Cross-platform mobile application that integrates with various health devices and provides intelligent health insights.',
    image: '/images/projects/health-tracker.jpg',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite', 'HealthKit', 'Google Fit'],
    category: 'Mobile Development',
    status: 'in-progress',
    featured: true,
    githubUrl: 'https://github.com/username/health-tracker',
    startDate: '2024-01',
    teamSize: 2,
    highlights: [
      'Cross-platform compatibility',
      'Real-time health monitoring',
      'AI-powered recommendations'
    ]
  }
]

const categories = ['All', 'AI/ML', 'Web Development', 'Mobile Development', 'Research']

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="card-hover h-full overflow-hidden">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
            <div className="text-primary-600 dark:text-primary-400 text-6xl font-bold opacity-20">
              {project.title.charAt(0)}
            </div>
          </div>
          
          {/* Overlay with quick actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
          >
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5 text-white" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="h-5 w-5 text-white" />
              </motion.a>
            )}
          </motion.div>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          {/* Stars Badge */}
          {project.stars && (
            <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-white font-medium">{project.stars}</span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {project.category}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Meta */}
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{project.startDate} - {project.endDate || 'Present'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{project.teamSize} member{project.teamSize > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Highlights</h4>
            <ul className="space-y-1">
              {project.highlights.slice(0, 2).map((highlight, idx) => (
                <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const filteredProjects = activeCategory === 'All' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="heading-2 mb-4">
            Featured Projects
          </motion.h2>
          <motion.p variants={itemVariants} className="body-large max-w-3xl mx-auto mb-8">
            A showcase of my recent work spanning AI/ML, web development, and mobile applications. 
            Each project represents a unique challenge and innovative solution.
          </motion.p>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeCategory} // Re-animate when category changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 text-center"
        >
          <p className="body text-gray-600 dark:text-gray-400 mb-6">
            Want to see more of my work? Check out my complete project portfolio.
          </p>
          <Link href="/projects" className="btn-primary">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  )
}