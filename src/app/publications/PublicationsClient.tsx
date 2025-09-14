'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Users, 
  ExternalLink, 
  Download, 
  BookOpen, 
  Award, 
  Quote,
  ChevronDown,
  FileText,
  Globe,
  TrendingUp
} from 'lucide-react'

interface Publication {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  type: 'journal' | 'conference' | 'preprint' | 'book-chapter' | 'thesis'
  status: 'published' | 'accepted' | 'under-review' | 'preprint'
  abstract: string
  keywords: string[]
  doi?: string
  url?: string
  pdfUrl?: string
  citations: number
  impactFactor?: number
  venue: string
  pages?: string
  volume?: string
  issue?: string
  isFirstAuthor: boolean
  isCorresponding: boolean
  collaborators: string[]
  fundingSource?: string
  category: string
}

const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning Approaches for Predictive Analytics in Healthcare Systems',
    authors: ['Your Name', 'Dr. Jane Smith', 'Prof. John Doe', 'Dr. Alice Johnson'],
    journal: 'Nature Machine Intelligence',
    year: 2024,
    type: 'journal',
    status: 'published',
    abstract: 'This paper presents novel machine learning methodologies for predictive analytics in healthcare systems, demonstrating significant improvements in patient outcome prediction accuracy. We introduce a hybrid deep learning architecture that combines convolutional neural networks with transformer models to analyze multi-modal healthcare data including electronic health records, medical imaging, and genomic information.',
    keywords: ['machine learning', 'healthcare', 'predictive analytics', 'deep learning', 'medical AI'],
    doi: '10.1038/s42256-024-00123-4',
    url: 'https://nature.com/articles/s42256-024-00123-4',
    pdfUrl: '/publications/ml-healthcare-2024.pdf',
    citations: 45,
    impactFactor: 25.8,
    venue: 'Nature Machine Intelligence',
    pages: '123-145',
    volume: '5',
    issue: '3',
    isFirstAuthor: true,
    isCorresponding: true,
    collaborators: ['Stanford University', 'MIT', 'Johns Hopkins'],
    fundingSource: 'NIH Grant R01-AI123456',
    category: 'Artificial Intelligence'
  },
  {
    id: '2',
    title: 'Quantum Computing Applications in Cryptographic Security: A Comprehensive Analysis',
    authors: ['Dr. Bob Wilson', 'Your Name', 'Prof. Carol Davis'],
    journal: 'IEEE Transactions on Quantum Engineering',
    year: 2023,
    type: 'journal',
    status: 'published',
    abstract: 'We explore the implications of quantum computing on modern cryptographic systems and propose novel quantum-resistant algorithms. Our research demonstrates the vulnerability of current encryption methods to quantum attacks and provides practical solutions for post-quantum cryptography implementation.',
    keywords: ['quantum computing', 'cryptography', 'security', 'post-quantum', 'encryption'],
    doi: '10.1109/TQE.2023.3456789',
    url: 'https://ieeexplore.ieee.org/document/3456789',
    pdfUrl: '/publications/quantum-crypto-2023.pdf',
    citations: 78,
    impactFactor: 8.2,
    venue: 'IEEE Transactions on Quantum Engineering',
    pages: '1-18',
    volume: '4',
    issue: '2',
    isFirstAuthor: false,
    isCorresponding: false,
    collaborators: ['IBM Research', 'Google Quantum AI'],
    fundingSource: 'NSF Grant CCF-2023456',
    category: 'Quantum Computing'
  },
  {
    id: '3',
    title: 'Sustainable Software Engineering: Green Computing Practices for Modern Applications',
    authors: ['Your Name', 'Dr. Emma Green', 'Prof. Michael Brown'],
    journal: 'ACM Computing Surveys',
    year: 2023,
    type: 'journal',
    status: 'published',
    abstract: 'This comprehensive survey examines sustainable software engineering practices and their impact on energy consumption in modern computing systems. We analyze various optimization techniques and propose a framework for developing environmentally conscious software applications.',
    keywords: ['sustainable computing', 'green software', 'energy efficiency', 'carbon footprint', 'optimization'],
    doi: '10.1145/3567890.1234567',
    url: 'https://dl.acm.org/doi/10.1145/3567890.1234567',
    pdfUrl: '/publications/green-computing-2023.pdf',
    citations: 32,
    impactFactor: 14.3,
    venue: 'ACM Computing Surveys',
    pages: '1-42',
    volume: '56',
    issue: '4',
    isFirstAuthor: true,
    isCorresponding: true,
    collaborators: ['University of California', 'Microsoft Research'],
    fundingSource: 'DOE Grant DE-SC0023456',
    category: 'Software Engineering'
  },
  {
    id: '4',
    title: 'Blockchain-Based Identity Management Systems: Security and Privacy Considerations',
    authors: ['Dr. Sarah Lee', 'Your Name', 'Prof. David Kim', 'Dr. Lisa Wang'],
    journal: 'Proceedings of the 2024 IEEE Symposium on Security and Privacy',
    year: 2024,
    type: 'conference',
    status: 'accepted',
    abstract: 'We present a novel blockchain-based identity management system that addresses privacy concerns while maintaining security and decentralization. Our approach uses zero-knowledge proofs and selective disclosure mechanisms to protect user privacy.',
    keywords: ['blockchain', 'identity management', 'privacy', 'zero-knowledge proofs', 'decentralization'],
    doi: '10.1109/SP54263.2024.00123',
    url: 'https://ieeexplore.ieee.org/document/00123',
    pdfUrl: '/publications/blockchain-identity-2024.pdf',
    citations: 12,
    venue: 'IEEE Symposium on Security and Privacy',
    pages: '456-471',
    isFirstAuthor: false,
    isCorresponding: false,
    collaborators: ['Carnegie Mellon University', 'ETH Zurich'],
    fundingSource: 'DARPA Grant HR001123C0456',
    category: 'Blockchain'
  },
  {
    id: '5',
    title: 'Neural Architecture Search for Edge Computing: Optimizing Deep Learning Models for Resource-Constrained Devices',
    authors: ['Your Name', 'Dr. Alex Chen'],
    journal: 'arXiv preprint',
    year: 2024,
    type: 'preprint',
    status: 'preprint',
    abstract: 'This work introduces an automated neural architecture search framework specifically designed for edge computing environments. We demonstrate how to optimize deep learning models for deployment on resource-constrained devices while maintaining competitive accuracy.',
    keywords: ['neural architecture search', 'edge computing', 'model optimization', 'mobile AI', 'efficiency'],
    url: 'https://arxiv.org/abs/2024.12345',
    pdfUrl: '/publications/nas-edge-2024.pdf',
    citations: 8,
    venue: 'arXiv',
    isFirstAuthor: true,
    isCorresponding: true,
    collaborators: ['Google Research', 'NVIDIA'],
    category: 'Machine Learning'
  }
]

const publicationTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'journal', label: 'Journal Articles' },
  { value: 'conference', label: 'Conference Papers' },
  { value: 'preprint', label: 'Preprints' },
  { value: 'book-chapter', label: 'Book Chapters' },
  { value: 'thesis', label: 'Thesis' }
]

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Quantum Computing', label: 'Quantum Computing' },
  { value: 'Software Engineering', label: 'Software Engineering' },
  { value: 'Blockchain', label: 'Blockchain' }
]

const statusColors: Record<Publication['status'], string> = {
  published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'under-review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  preprint: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
}

const typeIcons: Record<Publication['type'], React.ComponentType<any>> = {
  journal: BookOpen,
  conference: Users,
  preprint: FileText,
  'book-chapter': BookOpen,
  thesis: Award
}

export default function PublicationsClient() {
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('year')
  const [expandedAbstract, setExpandedAbstract] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredPublications = useMemo(() => {
    const filtered = mockPublications.filter(pub => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesType = selectedType === 'all' || pub.type === selectedType
      const matchesCategory = selectedCategory === 'all' || pub.category === selectedCategory
      
      return matchesSearch && matchesType && matchesCategory
    })

    // Sort publications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return b.year - a.year
        case 'citations':
          return b.citations - a.citations
        case 'impact':
          return (b.impactFactor || 0) - (a.impactFactor || 0)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedType, selectedCategory, sortBy])

  const stats = useMemo(() => {
    const totalCitations = mockPublications.reduce((sum, pub) => sum + pub.citations, 0)
    const hIndex = calculateHIndex(mockPublications)
    const firstAuthorPapers = mockPublications.filter(pub => pub.isFirstAuthor).length
    const correspondingAuthorPapers = mockPublications.filter(pub => pub.isCorresponding).length

    return {
      totalPublications: mockPublications.length,
      totalCitations,
      hIndex,
      firstAuthorPapers,
      correspondingAuthorPapers
    }
  }, [])

  function calculateHIndex(publications: Publication[]): number {
    const sortedCitations = publications
      .map(pub => pub.citations)
      .sort((a, b) => b - a)
    
    let hIndex = 0
    for (let i = 0; i < sortedCitations.length; i++) {
      if (sortedCitations[i] >= i + 1) {
        hIndex = i + 1
      } else {
        break
      }
    }
    return hIndex
  }

  const PublicationCard = ({ publication }: { publication: Publication }) => {
    const TypeIcon = typeIcons[publication.type]
    const isExpanded = expandedAbstract === publication.id

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 dark:border-slate-700"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TypeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[publication.status]}`}>
                {publication.status.replace('-', ' ').toUpperCase()}
              </span>
              {publication.isFirstAuthor && (
                <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full text-xs font-medium">
                  First Author
                </span>
              )}
              {publication.isCorresponding && (
                <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-full text-xs font-medium">
                  Corresponding
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 dark:text-slate-400">{publication.year}</div>
            {publication.impactFactor && (
              <div className="text-xs text-slate-500 dark:text-slate-500">
                IF: {publication.impactFactor}
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
          {publication.title}
        </h3>

        {/* Authors */}
        <div className="flex items-center space-x-2 mb-3">
          <Users className="w-4 h-4 text-slate-500" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {publication.authors.map((author, index) => (
              <span key={index} className={author === 'Your Name' ? 'font-semibold text-blue-600 dark:text-blue-400' : ''}>
                {author}{index < publication.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* Venue */}
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen className="w-4 h-4 text-slate-500" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {publication.venue}
            {publication.volume && (
              <span className="text-slate-500 dark:text-slate-400">
                , Vol. {publication.volume}
                {publication.issue && `, Issue ${publication.issue}`}
                {publication.pages && `, pp. ${publication.pages}`}
              </span>
            )}
          </p>
        </div>

        {/* Abstract */}
        <div className="mb-4">
          <button
            onClick={() => setExpandedAbstract(isExpanded ? null : publication.id)}
            className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <Quote className="w-4 h-4" />
            <span>{isExpanded ? 'Hide Abstract' : 'Show Abstract'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {publication.abstract}
              </p>
            </motion.div>
          )}
        </div>

        {/* Keywords */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {publication.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {publication.citations} citations
              </span>
            </div>
            {publication.collaborators.length > 0 && (
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {publication.collaborators.length} institutions
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
            {publication.url && (
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                title="View Online"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Research Publications
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Explore my contributions to the scientific community through peer-reviewed research, 
          conference proceedings, and collaborative academic work.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12"
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {stats.totalPublications}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Publications</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {stats.totalCitations}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Citations</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {stats.hIndex}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">h-index</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
            {stats.firstAuthorPapers}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">First Author</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {stats.correspondingAuthorPapers}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Corresponding</div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            {publicationTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="year">Sort by Year</option>
            <option value="citations">Sort by Citations</option>
            <option value="impact">Sort by Impact Factor</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <p className="text-slate-600 dark:text-slate-400">
          Showing {filteredPublications.length} of {mockPublications.length} publications
        </p>
      </motion.div>

      {/* Publications Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        {filteredPublications.map((publication, index) => (
          <motion.div
            key={publication.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PublicationCard publication={publication} />
          </motion.div>
        ))}
      </motion.div>

      {filteredPublications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No publications found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search criteria or filters.
          </p>
        </motion.div>
      )}
    </div>
  )
}