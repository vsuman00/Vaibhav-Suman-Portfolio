'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Filter, Grid, List, ExternalLink, Github, Calendar, Users, Star, ArrowRight, X } from 'lucide-react'

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

// Extended mock data - in real app, this would come from Sanity
const allProjects: Project[] = [
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
  },
  {
    id: '4',
    title: 'E-commerce Analytics Dashboard',
    description: 'Advanced analytics dashboard for e-commerce businesses with real-time metrics, predictive analytics, and automated reporting.',
    longDescription: 'A comprehensive business intelligence platform that helps e-commerce companies make data-driven decisions.',
    image: '/images/projects/analytics-dashboard.jpg',
    technologies: ['Vue.js', 'D3.js', 'Python', 'Django', 'PostgreSQL', 'Redis', 'Celery'],
    category: 'Web Development',
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/username/analytics-dashboard',
    liveUrl: 'https://analytics-dashboard.demo.com',
    startDate: '2022-09',
    endDate: '2023-02',
    teamSize: 4,
    stars: 156,
    highlights: [
      'Real-time data processing',
      'Predictive sales forecasting',
      'Automated report generation'
    ]
  },
  {
    id: '5',
    title: 'Blockchain Voting System',
    description: 'Secure and transparent voting system built on blockchain technology with end-to-end encryption and audit trails.',
    longDescription: 'A decentralized voting platform that ensures election integrity through blockchain technology and cryptographic security.',
    image: '/images/projects/blockchain-voting.jpg',
    technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'IPFS', 'MetaMask'],
    category: 'Blockchain',
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/username/blockchain-voting',
    startDate: '2023-01',
    endDate: '2023-05',
    teamSize: 3,
    stars: 89,
    highlights: [
      'Immutable vote records',
      'Zero-knowledge proofs',
      'Decentralized architecture'
    ]
  },
  {
    id: '6',
    title: 'IoT Smart Home System',
    description: 'Comprehensive IoT platform for smart home automation with voice control, energy monitoring, and security features.',
    longDescription: 'An integrated smart home solution that connects various IoT devices and provides intelligent automation.',
    image: '/images/projects/smart-home.jpg',
    technologies: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT', 'React Native', 'AWS IoT'],
    category: 'IoT',
    status: 'in-progress',
    featured: false,
    githubUrl: 'https://github.com/username/smart-home',
    startDate: '2023-10',
    teamSize: 2,
    highlights: [
      'Voice-controlled automation',
      'Energy usage optimization',
      'Advanced security monitoring'
    ]
  }
]

const categories = ['All', 'AI/ML', 'Web Development', 'Mobile Development', 'Blockchain', 'IoT', 'Research']
const statusOptions = ['All', 'Completed', 'In Progress', 'Planned']
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'stars', label: 'Most Stars' }
]

interface ProjectCardProps {
  project: Project
  viewMode: 'grid' | 'list'
  index: number
}

function ProjectCard({ project, viewMode, index }: ProjectCardProps) {
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

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        role="listitem"
      >
        <article className="card-hover p-6" aria-labelledby={`project-title-${project.id}`}>
          <div className="flex items-start space-x-6">
            {/* Project Image */}
            <div 
              className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg"
              role="img"
              aria-label={`${project.title} project thumbnail`}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                <div className="text-primary-600 dark:text-primary-400 text-2xl font-bold opacity-20" aria-hidden="true">
                  {project.title.charAt(0)}
                </div>
              </div>
              {project.stars && (
                <div 
                  className="absolute top-1 right-1 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded px-1 py-0.5"
                  role="status"
                  aria-label={`${project.stars} GitHub stars`}
                >
                  <Star className="h-2 w-2 text-yellow-400 fill-current" aria-hidden="true" />
                  <span className="text-xs text-white font-medium">{project.stars}</span>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 
                    className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                    id={`project-title-${project.id}`}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1" role="group" aria-label="Project metadata">
                    <span 
                      className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                      role="status"
                      aria-label={`Category: ${project.category}`}
                    >
                      {project.category}
                    </span>
                    <span 
                      className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(project.status)}`}
                      role="status"
                      aria-label={`Project status: ${project.status.replace('-', ' ')}`}
                    >
                      {project.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2" role="group" aria-label="Project links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1" role="list" aria-label="Technologies used">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span 
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded"
                      role="listitem"
                      aria-label={`${project.technologies.length - 4} more technologies`}
                    >
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
                  aria-label={`View detailed information about ${project.title}`}
                >
                  View Details
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </motion.div>
    )
  }

  // Grid view (same as FeaturedProjects component)
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="listitem"
    >
      <article className="card-hover h-full overflow-hidden" aria-labelledby={`grid-project-title-${project.id}`}>
        {/* Project Image */}
        <div 
          className="relative h-48 overflow-hidden"
          role="img"
          aria-label={`${project.title} project preview`}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
            <div className="text-primary-600 dark:text-primary-400 text-6xl font-bold opacity-20" aria-hidden="true">
              {project.title.charAt(0)}
            </div>
          </div>
          
          {/* Overlay with quick actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
            role="group"
            aria-label="Project quick actions"
          >
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/60"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="h-5 w-5 text-white" aria-hidden="true" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/60"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-5 w-5 text-white" aria-hidden="true" />
              </motion.a>
            )}
          </motion.div>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span 
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}
              role="status"
              aria-label={`Project status: ${project.status.replace('-', ' ')}`}
            >
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          {/* Stars Badge */}
          {project.stars && (
            <div 
              className="absolute top-4 right-4 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1"
              role="status"
              aria-label={`${project.stars} GitHub stars`}
            >
              <Star className="h-3 w-3 text-yellow-400 fill-current" aria-hidden="true" />
              <span className="text-xs text-white font-medium">{project.stars}</span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 
                className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                id={`grid-project-title-${project.id}`}
              >
                {project.title}
              </h3>
              <span 
                className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                role="status"
                aria-label={`Category: ${project.category}`}
              >
                {project.category}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Meta */}
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-4" role="group" aria-label="Project details">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <time dateTime={project.startDate}>
                {project.startDate} - {project.endDate || 'Present'}
              </time>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" aria-hidden="true" />
              <span aria-label={`Team size: ${project.teamSize} member${project.teamSize > 1 ? 's' : ''}`}>
                {project.teamSize} member{project.teamSize > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-1" role="list" aria-label="Technologies used">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                  role="listitem"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span 
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded"
                  role="listitem"
                  aria-label={`${project.technologies.length - 4} more technologies`}
                >
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
            aria-label={`View detailed information about ${project.title}`}
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </motion.div>
  )
}

export default function ProjectsClient() {
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = allProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      
      const matchesStatus = selectedStatus === 'All' || 
                           project.status === selectedStatus.toLowerCase().replace(' ', '-')
      
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        case 'oldest':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case 'name':
          return a.title.localeCompare(b.title)
        case 'stars':
          return (b.stars || 0) - (a.stars || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedStatus, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedStatus('All')
    setSortBy('newest')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All' || sortBy !== 'newest'

  return (
    <section ref={sectionRef} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-1 mb-4">All Projects</h1>
          <p className="body-large max-w-3xl mx-auto">
            Explore my complete portfolio of projects spanning various technologies and domains. 
            Each project represents a unique challenge and innovative solution.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6" role="search">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              id="project-search"
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none"
              aria-label="Search projects by name, description, or technology"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Search through projects by title, description, or technology stack
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    aria-pressed={selectedCategory === category}
                    aria-label={`Filter projects by ${category}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <label htmlFor="project-sort" className="sr-only">Sort projects by</label>
              <select
                id="project-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none"
                aria-label="Sort projects by date, title, or featured status"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Filters (Mobile Collapsible / Desktop Always Visible) */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                <label htmlFor="status-filter" className="sr-only">Filter by project status</label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none"
                  aria-label="Filter projects by status"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
          role="status"
          aria-live="polite"
          aria-label="Search results count"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedProjects.length} of {allProjects.length} projects
          </p>
        </motion.div>

        {/* Projects Grid/List */}
        {filteredAndSortedProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
            }
            role="list"
            aria-label={`Projects displayed in ${viewMode} view`}
          >
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
            role="status"
            aria-live="polite"
          >
            <div className="max-w-md mx-auto">
              <div 
                className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
                role="img"
                aria-label="No results found icon"
              >
                <Search className="h-8 w-8 text-gray-400" aria-hidden="true" />
              </div>
              <h3 
                className="text-lg font-medium text-gray-900 dark:text-white mb-2"
                id="no-results-heading"
              >
                No projects found
              </h3>
              <p 
                className="text-gray-600 dark:text-gray-400 mb-6"
                aria-describedby="no-results-heading"
              >
                Try adjusting your search criteria or filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Clear all search filters and show all projects"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}