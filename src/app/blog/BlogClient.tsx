'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen,
  TrendingUp,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
  }
  coverImage: string
  featured: boolean
  views: number
  likes: number
  comments: number
}

interface BlogCategory {
  name: string
  count: number
  color: string
}

// Mock data - in real app, this would come from Sanity CMS
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with Next.js 14',
    excerpt: 'Learn how to leverage the latest features in Next.js 14 to build performant and scalable React applications with server components and improved routing.',
    content: '',
    slug: 'building-scalable-react-applications-nextjs-14',
    publishedAt: '2024-01-15',
    readingTime: 8,
    category: 'Web Development',
    tags: ['React', 'Next.js', 'Performance', 'Server Components'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg'
    },
    coverImage: '/blog/nextjs-14.jpg',
    featured: true,
    views: 2450,
    likes: 89,
    comments: 23
  },
  {
    id: '2',
    title: 'The Future of AI in Web Development',
    excerpt: 'Exploring how artificial intelligence is transforming the way we build web applications, from code generation to automated testing and deployment.',
    content: '',
    slug: 'future-ai-web-development',
    publishedAt: '2024-01-10',
    readingTime: 12,
    category: 'Artificial Intelligence',
    tags: ['AI', 'Machine Learning', 'Automation', 'Future Tech'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg'
    },
    coverImage: '/blog/ai-web-dev.jpg',
    featured: true,
    views: 3200,
    likes: 156,
    comments: 45
  },
  {
    id: '3',
    title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
    excerpt: 'Deep dive into advanced TypeScript patterns, utility types, and best practices that will make your code more robust and maintainable.',
    content: '',
    slug: 'mastering-typescript-advanced-patterns',
    publishedAt: '2024-01-05',
    readingTime: 15,
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Advanced'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg'
    },
    coverImage: '/blog/typescript-patterns.jpg',
    featured: false,
    views: 1890,
    likes: 67,
    comments: 18
  },
  {
    id: '4',
    title: 'Building Real-time Applications with WebSockets',
    excerpt: 'Learn how to implement real-time features in your web applications using WebSockets, Socket.io, and modern browser APIs.',
    content: '',
    slug: 'building-realtime-applications-websockets',
    publishedAt: '2023-12-28',
    readingTime: 10,
    category: 'Web Development',
    tags: ['WebSockets', 'Real-time', 'Socket.io', 'APIs'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg'
    },
    coverImage: '/blog/websockets.jpg',
    featured: false,
    views: 1650,
    likes: 45,
    comments: 12
  },
  {
    id: '5',
    title: 'Database Design Patterns for Modern Applications',
    excerpt: 'Explore essential database design patterns and strategies for building scalable and efficient data layers in modern applications.',
    content: '',
    slug: 'database-design-patterns-modern-applications',
    publishedAt: '2023-12-20',
    readingTime: 14,
    category: 'Backend Development',
    tags: ['Database', 'SQL', 'NoSQL', 'Architecture'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg'
    },
    coverImage: '/blog/database-patterns.jpg',
    featured: false,
    views: 2100,
    likes: 78,
    comments: 31
  },
  {
    id: '6',
    title: 'Optimizing Web Performance: A Complete Guide',
    excerpt: 'Comprehensive guide to web performance optimization covering everything from image optimization to code splitting and caching strategies.',
    content: '',
    slug: 'optimizing-web-performance-complete-guide',
    publishedAt: '2023-12-15',
    readingTime: 18,
    category: 'Performance',
    tags: ['Performance', 'Optimization', 'Web Vitals', 'Speed'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg'
    },
    coverImage: '/blog/web-performance.jpg',
    featured: true,
    views: 4200,
    likes: 198,
    comments: 67
  }
]

const categories: BlogCategory[] = [
  { name: 'All', count: blogPosts.length, color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
  { name: 'Web Development', count: blogPosts.filter(p => p.category === 'Web Development').length, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { name: 'Artificial Intelligence', count: blogPosts.filter(p => p.category === 'Artificial Intelligence').length, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  { name: 'Programming', count: blogPosts.filter(p => p.category === 'Programming').length, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { name: 'Backend Development', count: blogPosts.filter(p => p.category === 'Backend Development').length, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  { name: 'Performance', count: blogPosts.filter(p => p.category === 'Performance').length, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
]

function BlogPostCard({ post, index }: { post: BlogPost, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }
  
  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card overflow-hidden hover:shadow-xl transition-all duration-300 group ${
        post.featured ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''
      }`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-primary-600 dark:text-primary-400" />
          </div>
          {post.featured && (
            <div className="absolute top-4 left-4">
              <span className="px-2 py-1 text-xs font-medium bg-primary-600 text-white rounded-full">
                Featured
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded ${categories.find(c => c.name === post.category)?.color}`}>
            {post.category}
          </span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            {post.readingTime} min read
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatNumber(post.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{formatNumber(post.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </div>
          </div>
          
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium"
          >
            Read More
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card overflow-hidden hover:shadow-xl transition-all duration-300 group mb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <Link href={`/blog/${post.slug}`} className="relative aspect-video lg:aspect-auto overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
            <BookOpen className="h-20 w-20 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-sm font-medium bg-primary-600 text-white rounded-full">
              Featured Post
            </span>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </Link>
        
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded ${categories.find(c => c.name === post.category)?.color}`}>
              {post.category}
            </span>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              {post.readingTime} min read
            </div>
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {post.title}
            </h2>
          </Link>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <Link
            href={`/blog/${post.slug}`}
            className="btn-primary inline-flex items-center w-fit"
          >
            Read Full Article
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
    
    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case 'popular':
          return b.views - a.views
        default:
          return 0
      }
    })
    
    return filtered
  }, [searchQuery, selectedCategory, sortBy])
  
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = filteredAndSortedPosts.filter(post => !post.featured || selectedCategory !== 'All' || searchQuery !== '')
  
  return (
    <main ref={sectionRef} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-1 mb-4">Blog</h1>
          <p className="body-large max-w-3xl mx-auto mb-8">
            Thoughts, tutorials, and insights on web development, AI, and technology. 
            Join me on my journey of continuous learning and sharing knowledge with the community.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>{blogPosts.length} Articles</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>{blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()} Total Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>{blogPosts.reduce((sum, post) => sum + post.likes, 0)} Likes</span>
            </div>
          </div>
        </motion.section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="heading-2 mb-8">Featured Posts</h2>
            <div className="space-y-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Filters and Search */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
          role="search"
          aria-label="Blog post filters and search"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="blog-search" className="sr-only">
                Search blog articles
              </label>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                aria-describedby="search-results-count"
              />
            </div>
            
            {/* Sort */}
            <div className="flex items-center space-x-4">
              <label htmlFor="blog-sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort by:
              </label>
              <select
                id="blog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                aria-label="Sort blog posts by"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  selectedCategory === category.name
                    ? 'bg-primary-600 text-white shadow-lg'
                    : `${category.color} hover:shadow-md`
                }`}
                aria-pressed={selectedCategory === category.name}
                aria-label={`Filter by ${category.name} category, ${category.count} posts`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          aria-live="polite"
          aria-label="Blog posts results"
        >
          {regularPosts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="heading-2">
                  {selectedCategory === 'All' && searchQuery === '' ? 'All Posts' : 'Search Results'}
                </h2>
                <span id="search-results-count" className="text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
                  {regularPosts.length} article{regularPosts.length !== 1 ? 's' : ''} found
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                {regularPosts.map((post, index) => (
                  <div key={post.id} role="listitem">
                    <BlogPostCard post={post} index={index} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16" role="status" aria-live="polite">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Clear all search filters and show all posts"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="card p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800 text-center">
            <h2 className="heading-2 mb-4">Stay Updated</h2>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Get notified when I publish new articles. No spam, just quality content about web development and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}