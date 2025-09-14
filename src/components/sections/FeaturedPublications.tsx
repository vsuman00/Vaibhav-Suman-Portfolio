'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, FileText, Calendar, Award, Download, Quote } from 'lucide-react'
import Link from 'next/link'

interface Author {
  name: string
  isMe: boolean
}

interface Publication {
  id: string
  title: string
  abstract: string
  authors: Author[]
  journal: string
  year: number
  month: string
  type: 'journal' | 'conference' | 'preprint' | 'book-chapter'
  status: 'published' | 'accepted' | 'under-review' | 'preprint'
  featured: boolean
  doi?: string
  url?: string
  pdfUrl?: string
  citations: number
  keywords: string[]
  impact: string
  venue: string
}

// Mock data - in real app, this would come from Sanity
const featuredPublications: Publication[] = [
  {
    id: '1',
    title: 'Enhancing Natural Language Processing with Transformer-based Architectures for Academic Research',
    abstract: 'This paper presents a novel approach to improving NLP models for academic text processing using advanced transformer architectures. We demonstrate significant improvements in research paper classification and summarization tasks.',
    authors: [
      { name: 'John Doe', isMe: true },
      { name: 'Dr. Jane Smith', isMe: false },
      { name: 'Prof. Michael Johnson', isMe: false }
    ],
    journal: 'Journal of Artificial Intelligence Research',
    year: 2024,
    month: 'March',
    type: 'journal',
    status: 'published',
    featured: true,
    doi: '10.1613/jair.1.12345',
    url: 'https://jair.org/index.php/jair/article/view/12345',
    pdfUrl: '/papers/nlp-transformers-2024.pdf',
    citations: 23,
    keywords: ['Natural Language Processing', 'Transformers', 'Academic Text Mining', 'Machine Learning'],
    impact: 'Cited by leading AI research groups worldwide',
    venue: 'JAIR 2024'
  },
  {
    id: '2',
    title: 'Real-time Collaborative Systems: A Study on WebRTC Performance Optimization',
    abstract: 'An in-depth analysis of WebRTC performance in large-scale collaborative applications, proposing novel optimization techniques that reduce latency by up to 40% while maintaining connection quality.',
    authors: [
      { name: 'John Doe', isMe: true },
      { name: 'Dr. Sarah Wilson', isMe: false }
    ],
    journal: 'IEEE Transactions on Network and Service Management',
    year: 2023,
    month: 'November',
    type: 'journal',
    status: 'published',
    featured: true,
    doi: '10.1109/TNSM.2023.12345',
    url: 'https://ieeexplore.ieee.org/document/12345',
    pdfUrl: '/papers/webrtc-optimization-2023.pdf',
    citations: 45,
    keywords: ['WebRTC', 'Real-time Communication', 'Performance Optimization', 'Distributed Systems'],
    impact: 'Implemented by major collaboration platforms',
    venue: 'IEEE TNSM 2023'
  },
  {
    id: '3',
    title: 'Mobile Health Applications: Privacy-Preserving Data Analytics Using Federated Learning',
    abstract: 'This research explores the application of federated learning techniques in mobile health applications to enable privacy-preserving analytics while maintaining model accuracy and user data protection.',
    authors: [
      { name: 'Dr. Emily Chen', isMe: false },
      { name: 'John Doe', isMe: true },
      { name: 'Prof. David Lee', isMe: false }
    ],
    journal: 'ACM Conference on Health, Inference, and Learning',
    year: 2024,
    month: 'January',
    type: 'conference',
    status: 'accepted',
    featured: true,
    url: 'https://dl.acm.org/conference/chil',
    citations: 12,
    keywords: ['Federated Learning', 'Mobile Health', 'Privacy', 'Healthcare Analytics'],
    impact: 'Adopted by healthcare startups for patient data analysis',
    venue: 'ACM CHIL 2024'
  }
]

const publicationTypes = {
  journal: { label: 'Journal Article', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  conference: { label: 'Conference Paper', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  preprint: { label: 'Preprint', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  'book-chapter': { label: 'Book Chapter', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' }
}

const statusTypes = {
  published: { label: 'Published', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  'under-review': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  preprint: { label: 'Preprint', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
}

interface PublicationCardProps {
  publication: Publication
  index: number
}

function PublicationCard({ publication, index }: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const formatAuthors = (authors: Author[]) => {
    return authors.map((author, idx) => (
      <span key={idx} className={author.isMe ? 'font-semibold text-primary-600 dark:text-primary-400' : ''}>
        {author.name}
        {idx < authors.length - 1 && ', '}
      </span>
    ))
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="card-hover h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${publicationTypes[publication.type].color}`}>
              {publicationTypes[publication.type].label}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded ${statusTypes[publication.status].color}`}>
              {statusTypes[publication.status].label}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{publication.month} {publication.year}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {publication.title}
        </h3>

        {/* Authors */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {formatAuthors(publication.authors)}
          </p>
        </div>

        {/* Venue */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {publication.journal}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {publication.venue}
          </p>
        </div>

        {/* Abstract */}
        <div className="mb-4">
          <p className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed ${
            isExpanded ? '' : 'line-clamp-3'
          }`}>
            {publication.abstract}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        {/* Keywords */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {publication.keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
              >
                {keyword}
              </span>
            ))}
            {publication.keywords.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
                +{publication.keywords.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Quote className="h-4 w-4" />
              <span>{publication.citations} citations</span>
            </div>
            {publication.doi && (
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>DOI</span>
              </div>
            )}
          </div>
        </div>

        {/* Impact */}
        <div className="mb-6">
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Award className="h-4 w-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-primary-700 dark:text-primary-300">
                <span className="font-medium">Impact:</span> {publication.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {publication.url && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Paper
            </a>
          )}
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              PDF
            </a>
          )}
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FileText className="h-4 w-4 mr-1" />
              DOI
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedPublications() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

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

  // Calculate total citations
  const totalCitations = featuredPublications.reduce((sum, pub) => sum + pub.citations, 0)

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="heading-2 mb-4">
            Featured Publications
          </motion.h2>
          <motion.p variants={itemVariants} className="body-large max-w-3xl mx-auto mb-8">
            Recent research contributions in AI, machine learning, and software engineering. 
            My work has been published in top-tier journals and conferences.
          </motion.p>

          {/* Publication Stats */}
          <motion.div variants={itemVariants} className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {featuredPublications.length}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Publications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {totalCitations}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Citations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {new Set(featuredPublications.map(p => p.journal)).size}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Venues</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {featuredPublications.map((publication, index) => (
            <PublicationCard key={publication.id} publication={publication} index={index} />
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
            Interested in my research? View my complete publication list and ongoing projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/publications" className="btn-primary">
              View All Publications
            </Link>
            <Link href="/research" className="btn-secondary">
              Current Research
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}