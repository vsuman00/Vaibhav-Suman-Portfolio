'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Building, 
  Users, 
  Award, 
  TrendingUp, 
  Code, 
  Briefcase,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Star,
  Target,
  Zap
} from 'lucide-react'

interface Experience {
  id: string
  company: string
  position: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'
  startDate: string
  endDate: string | null // null means current
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
  teamSize?: number
  companySize: string
  industry: string
  website?: string
  logo?: string
  highlights: {
    title: string
    description: string
    impact?: string
  }[]
  skills: string[]
  projects: {
    name: string
    description: string
    technologies: string[]
    impact?: string
  }[]
}

const mockExperiences: Experience[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    position: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    type: 'full-time',
    startDate: '2022-03',
    endDate: null,
    duration: '2+ years',
    description: 'Leading development of scalable web applications and microservices architecture. Responsible for technical decision-making, code reviews, and mentoring junior developers.',
    achievements: [
      'Increased application performance by 40% through optimization and caching strategies',
      'Led migration from monolithic to microservices architecture serving 1M+ users',
      'Mentored 5 junior developers and established coding standards for the team',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Architected real-time notification system handling 100K+ daily events'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    teamSize: 12,
    companySize: '500-1000',
    industry: 'Technology',
    website: 'https://techcorp.com',
    highlights: [
      {
        title: 'Microservices Migration',
        description: 'Successfully led the migration from a monolithic architecture to microservices',
        impact: '40% improvement in deployment frequency and 60% reduction in system downtime'
      },
      {
        title: 'Performance Optimization',
        description: 'Implemented advanced caching and database optimization strategies',
        impact: 'Reduced average page load time from 3.2s to 1.1s'
      },
      {
        title: 'Team Leadership',
        description: 'Mentored junior developers and established development best practices',
        impact: 'Improved team productivity by 35% and reduced code review time by 50%'
      }
    ],
    skills: ['Technical Leadership', 'System Architecture', 'Performance Optimization', 'Team Mentoring'],
    projects: [
      {
        name: 'E-commerce Platform Redesign',
        description: 'Complete overhaul of the company\'s e-commerce platform with modern tech stack',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
        impact: '25% increase in conversion rate'
      },
      {
        name: 'Real-time Analytics Dashboard',
        description: 'Built comprehensive analytics dashboard for business intelligence',
        technologies: ['React', 'D3.js', 'WebSocket', 'InfluxDB'],
        impact: 'Enabled data-driven decisions resulting in 15% revenue growth'
      }
    ]
  },
  {
    id: '2',
    company: 'InnovateLab',
    position: 'Full Stack Developer',
    location: 'New York, NY',
    type: 'full-time',
    startDate: '2020-06',
    endDate: '2022-02',
    duration: '1 year 8 months',
    description: 'Developed and maintained multiple client-facing applications using modern web technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    achievements: [
      'Built 3 major client applications from scratch serving 50K+ users each',
      'Reduced bug reports by 45% through comprehensive testing implementation',
      'Improved application security by implementing OAuth 2.0 and JWT authentication',
      'Optimized database queries resulting in 30% faster response times',
      'Contributed to open-source projects gaining 500+ GitHub stars'
    ],
    technologies: ['Vue.js', 'Python', 'Django', 'MySQL', 'MongoDB', 'Docker', 'Jenkins'],
    teamSize: 8,
    companySize: '100-500',
    industry: 'Software Development',
    website: 'https://innovatelab.com',
    highlights: [
      {
        title: 'Client Application Development',
        description: 'Successfully delivered 3 major client applications on time and within budget',
        impact: 'Generated $2M+ in revenue for the company'
      },
      {
        title: 'Testing Implementation',
        description: 'Established comprehensive testing strategy including unit, integration, and E2E tests',
        impact: '45% reduction in production bugs and 60% faster bug resolution'
      },
      {
        title: 'Open Source Contributions',
        description: 'Active contributor to several open-source projects in the JavaScript ecosystem',
        impact: 'Enhanced company reputation and attracted top talent'
      }
    ],
    skills: ['Full Stack Development', 'Testing Strategy', 'Database Optimization', 'Open Source'],
    projects: [
      {
        name: 'Healthcare Management System',
        description: 'Comprehensive system for managing patient records and appointments',
        technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
        impact: 'Streamlined operations for 20+ healthcare providers'
      },
      {
        name: 'Financial Analytics Platform',
        description: 'Real-time financial data analysis and reporting platform',
        technologies: ['React', 'Python', 'FastAPI', 'TimescaleDB'],
        impact: 'Enabled real-time decision making for investment firms'
      }
    ]
  },
  {
    id: '3',
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    location: 'Austin, TX',
    type: 'full-time',
    startDate: '2019-01',
    endDate: '2020-05',
    duration: '1 year 4 months',
    description: 'Focused on creating exceptional user experiences through modern frontend technologies. Worked closely with designers and product managers to implement pixel-perfect interfaces.',
    achievements: [
      'Developed responsive web applications with 99.9% cross-browser compatibility',
      'Implemented design system reducing development time by 50%',
      'Improved website accessibility score from 65% to 95%',
      'Built progressive web app features increasing user engagement by 35%',
      'Collaborated with UX team to conduct A/B tests improving conversion by 20%'
    ],
    technologies: ['React', 'JavaScript', 'SASS', 'Webpack', 'Jest', 'Cypress'],
    teamSize: 5,
    companySize: '10-50',
    industry: 'Startup',
    website: 'https://startupxyz.com',
    highlights: [
      {
        title: 'Design System Implementation',
        description: 'Created comprehensive design system with reusable components',
        impact: '50% reduction in development time and improved consistency'
      },
      {
        title: 'Accessibility Improvements',
        description: 'Implemented WCAG 2.1 AA compliance across all applications',
        impact: 'Increased user base by 15% and improved user satisfaction scores'
      },
      {
        title: 'Performance Optimization',
        description: 'Optimized application performance through code splitting and lazy loading',
        impact: '40% improvement in Core Web Vitals scores'
      }
    ],
    skills: ['Frontend Development', 'Design Systems', 'Accessibility', 'Performance Optimization'],
    projects: [
      {
        name: 'Customer Portal Redesign',
        description: 'Complete redesign of customer-facing portal with modern UI/UX',
        technologies: ['React', 'TypeScript', 'Styled Components'],
        impact: '35% increase in user engagement and 20% improvement in task completion rate'
      },
      {
        name: 'Mobile-First E-commerce App',
        description: 'Progressive web app for mobile e-commerce experience',
        technologies: ['React', 'PWA', 'Service Workers', 'IndexedDB'],
        impact: '60% increase in mobile conversions'
      }
    ]
  },
  {
    id: '4',
    company: 'FreelanceWork',
    position: 'Freelance Web Developer',
    location: 'Remote',
    type: 'freelance',
    startDate: '2018-03',
    endDate: '2018-12',
    duration: '9 months',
    description: 'Provided web development services to various clients ranging from small businesses to medium-sized companies. Specialized in creating custom websites and web applications.',
    achievements: [
      'Successfully completed 15+ projects with 100% client satisfaction rate',
      'Generated $75K+ in revenue through freelance work',
      'Built long-term relationships with 8 recurring clients',
      'Delivered all projects on time and within budget',
      'Expanded skill set across multiple technologies and industries'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress', 'MySQL', 'Bootstrap'],
    companySize: 'Self-employed',
    industry: 'Freelance',
    highlights: [
      {
        title: 'Client Satisfaction',
        description: 'Maintained 100% client satisfaction rate across all projects',
        impact: '80% of clients became repeat customers'
      },
      {
        title: 'Business Growth',
        description: 'Successfully scaled freelance business to sustainable income',
        impact: 'Generated consistent monthly revenue of $8K+'
      },
      {
        title: 'Skill Diversification',
        description: 'Worked across various industries and technology stacks',
        impact: 'Gained expertise in 10+ different technologies and frameworks'
      }
    ],
    skills: ['Client Management', 'Project Management', 'Business Development', 'Multi-stack Development'],
    projects: [
      {
        name: 'Restaurant Chain Website',
        description: 'Multi-location restaurant website with online ordering system',
        technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
        impact: '40% increase in online orders'
      },
      {
        name: 'Real Estate Platform',
        description: 'Property listing and management platform for real estate agency',
        technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
        impact: 'Streamlined property management for 500+ listings'
      }
    ]
  }
]

const typeColors = {
  'full-time': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'part-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'contract': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'internship': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'freelance': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
}

export default function ExperienceClient() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredExperiences = useMemo(() => {
    if (selectedFilter === 'all') return mockExperiences
    return mockExperiences.filter(exp => exp.type === selectedFilter)
  }, [selectedFilter])

  const totalYearsExperience = useMemo(() => {
    const totalMonths = mockExperiences.reduce((total, exp) => {
      const start = new Date(exp.startDate)
      const end = exp.endDate ? new Date(exp.endDate) : new Date()
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      return total + months
    }, 0)
    return Math.floor(totalMonths / 12)
  }, [])

  const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
    const isExpanded = expandedExperience === experience.id
    const isCurrentJob = !experience.endDate

    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative"
      >
        {/* Timeline Line */}
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600" />
        
        {/* Timeline Dot */}
        <div className={`absolute left-4 top-8 w-4 h-4 rounded-full border-4 ${
          isCurrentJob 
            ? 'bg-green-500 border-green-200 dark:border-green-800 animate-pulse' 
            : 'bg-blue-500 border-blue-200 dark:border-blue-800'
        }`} />

        {/* Content Card */}
        <div className="ml-16 mb-8">
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 dark:border-slate-700"
            whileHover={{ y: -2 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {experience.position}
                  </h3>
                  {isCurrentJob && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{experience.company}</span>
                    {experience.website && (
                      <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  {experience.teamSize && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Team of {experience.teamSize}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[experience.type]}`}>
                  {experience.type.replace('-', ' ').toUpperCase()}
                </span>
                <button
                  onClick={() => setExpandedExperience(isExpanded ? null : experience.id)}
                  className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span className="text-sm font-medium">
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              {experience.description}
            </p>

            {/* Technologies */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-700"
              >
                {/* Key Achievements */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experience.highlights.map((highlight, hlIndex) => (
                      <div key={hlIndex} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                        <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {highlight.title}
                        </h5>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                          {highlight.description}
                        </p>
                        {highlight.impact && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              {highlight.impact}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Notable Projects
                  </h4>
                  <div className="space-y-4">
                    {experience.projects.map((project, projIndex) => (
                      <div key={projIndex} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                        <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {project.name}
                        </h5>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.impact && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              {project.impact}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Developed */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Skills Developed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Professional Experience
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6">
          A comprehensive timeline of my professional journey, showcasing growth, 
          achievements, and the impact I&apos;ve made across various organizations.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {totalYearsExperience}+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {mockExperiences.length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Positions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {mockExperiences.reduce((total, exp) => total + exp.projects.length, 0)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Projects</div>
          </div>
        </div>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-2 border border-slate-200 dark:border-slate-700">
          <div className="flex space-x-1">
            {['all', 'full-time', 'freelance', 'contract'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {filter === 'all' ? 'All Experience' : filter.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {filteredExperiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
          />
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Let&apos;s Work Together
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
          I&apos;m always interested in new opportunities and challenging projects. 
          Let&apos;s discuss how my experience can contribute to your team&apos;s success.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get In Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </div>
  )
}