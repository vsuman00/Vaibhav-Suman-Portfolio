'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Calendar, Award, Shield, CheckCircle, Clock, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity'

interface Certification {
  _id: string
  name: string
  issuer: string
  description?: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  certificateFile?: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  skills?: string[]
  category: string
  level?: string
  logo?: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  featured: boolean
  order?: number
}

interface CertificationsClientProps {
  certifications: Certification[]
}

const categoryColors = {
  'programming': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'cloud': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  'data-science': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'machine-learning': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'devops': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'security': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'project-management': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const levelColors = {
  'beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'advanced': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'expert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

function isExpired(expiryDate?: string): boolean {
  if (!expiryDate) return false
  return new Date(expiryDate) < new Date()
}

function isExpiringSoon(expiryDate?: string): boolean {
  if (!expiryDate) return false
  const expiry = new Date(expiryDate)
  const now = new Date()
  const threeMonthsFromNow = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000))
  return expiry > now && expiry <= threeMonthsFromNow
}

export default function CertificationsClient({ certifications }: CertificationsClientProps) {
  const featuredCertifications = certifications.filter(cert => cert.featured)
  const otherCertifications = certifications.filter(cert => !cert.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8" role="banner" aria-labelledby="certifications-hero-heading">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 id="certifications-hero-heading" className="heading-1 mb-6">
              Professional Certifications
            </h1>
            <p className="body-large max-w-3xl mx-auto mb-8">
              Credentials and certifications that validate my expertise in software development, 
              cloud computing, and emerging technologies. Each certification represents continuous 
              learning and professional growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>{certifications.length} Total Certifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" aria-hidden="true" />
                <span>{featuredCertifications.length} Featured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                <span>{certifications.filter(c => c.credentialUrl).length} Verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Certifications */}
      {featuredCertifications.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8" role="region" aria-labelledby="featured-certifications-heading">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 id="featured-certifications-heading" className="heading-2 mb-4">
                Featured Certifications
              </h2>
              <p className="body-large max-w-3xl mx-auto">
                Highlighted certifications that showcase key competencies and expertise.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Featured professional certifications"
            >
              {featuredCertifications.map((cert) => (
                <motion.div key={cert._id} variants={itemVariants} role="listitem">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        {cert.logo && (
                          <div className="flex-shrink-0 mr-4">
                            <Image
                              src={urlFor(cert.logo).width(60).height(60).url()}
                              alt={`${cert.issuer} logo`}
                              width={60}
                              height={60}
                              className="rounded-lg object-contain"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <Badge className={categoryColors[cert.category as keyof typeof categoryColors] || categoryColors.other}>
                            {cert.category.replace('-', ' ').toUpperCase()}
                          </Badge>
                          {cert.level && (
                            <Badge variant="outline" className={levelColors[cert.level as keyof typeof levelColors]}>
                              {cert.level.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{cert.name}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">
                        {cert.issuer}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {cert.description && (
                        <p className="text-muted-foreground mb-4">{cert.description}</p>
                      )}
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span>Issued: {formatDate(cert.issueDate)}</span>
                        </div>
                        
                        {cert.expiryDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            <span className={`${
                              isExpired(cert.expiryDate) 
                                ? 'text-red-600 dark:text-red-400' 
                                : isExpiringSoon(cert.expiryDate)
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-muted-foreground'
                            }`}>
                              {isExpired(cert.expiryDate) 
                                ? `Expired: ${formatDate(cert.expiryDate)}`
                                : `Expires: ${formatDate(cert.expiryDate)}`
                              }
                            </span>
                          </div>
                        )}
                        
                        {cert.credentialId && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Credential ID: </span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">{cert.credentialId}</code>
                          </div>
                        )}
                      </div>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium mb-2">Skills Covered:</h4>
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {cert.credentialUrl && (
                          <Button asChild size="sm" className="flex-1">
                            <Link 
                              href={cert.credentialUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label={`Verify ${cert.name} certification`}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                              Verify
                            </Link>
                          </Button>
                        )}
                        {cert.certificateFile && cert.certificateFile.asset.url && (
                          <Button asChild variant="outline" size="sm">
                            <Link 
                              href={cert.certificateFile.asset.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label={`Download ${cert.name} certificate`}
                            >
                              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                              Certificate
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Certifications */}
      {otherCertifications.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8" role="region" aria-labelledby="all-certifications-heading">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 id="all-certifications-heading" className="heading-2 mb-4">
                {featuredCertifications.length > 0 ? 'Additional Certifications' : 'All Certifications'}
              </h2>
              <p className="body-large max-w-3xl mx-auto">
                Complete list of professional certifications and credentials.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              role="list"
              aria-label="Additional professional certifications"
            >
              {otherCertifications.map((cert) => (
                <motion.div key={cert._id} variants={itemVariants} role="listitem">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          {cert.logo && (
                            <div className="flex-shrink-0">
                              <Image
                                src={urlFor(cert.logo).width(48).height(48).url()}
                                alt={`${cert.issuer} logo`}
                                width={48}
                                height={48}
                                className="rounded-lg object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{cert.name}</CardTitle>
                            <CardDescription className="font-medium text-primary">
                              {cert.issuer}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={categoryColors[cert.category as keyof typeof categoryColors] || categoryColors.other}>
                            {cert.category.replace('-', ' ').toUpperCase()}
                          </Badge>
                          {cert.level && (
                            <Badge variant="outline" className={levelColors[cert.level as keyof typeof levelColors]}>
                              {cert.level.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {cert.description && (
                        <p className="text-muted-foreground mb-4">{cert.description}</p>
                      )}
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span>Issued: {formatDate(cert.issueDate)}</span>
                        </div>
                        
                        {cert.expiryDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            <span className={`${
                              isExpired(cert.expiryDate) 
                                ? 'text-red-600 dark:text-red-400' 
                                : isExpiringSoon(cert.expiryDate)
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-muted-foreground'
                            }`}>
                              {isExpired(cert.expiryDate) 
                                ? `Expired: ${formatDate(cert.expiryDate)}`
                                : `Expires: ${formatDate(cert.expiryDate)}`
                              }
                            </span>
                          </div>
                        )}
                        
                        {cert.credentialId && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">ID: </span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">{cert.credentialId}</code>
                          </div>
                        )}
                      </div>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Skills:</h4>
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {cert.skills.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{cert.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {cert.credentialUrl && (
                          <Button asChild size="sm" className="flex-1">
                            <Link 
                              href={cert.credentialUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label={`Verify ${cert.name} certification`}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                              Verify
                            </Link>
                          </Button>
                        )}
                        {cert.certificateFile && cert.certificateFile.asset.url && (
                          <Button asChild variant="outline" size="sm">
                            <Link 
                              href={cert.certificateFile.asset.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label={`Download ${cert.name} certificate`}
                            >
                              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                              Certificate
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {certifications.length === 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8" role="region" aria-labelledby="no-certifications-heading">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-6" aria-hidden="true" />
            <h2 id="no-certifications-heading" className="heading-2 mb-4">No Certifications Yet</h2>
            <p className="body-large text-muted-foreground mb-8">
              Certifications will be displayed here once they are added to the content management system.
            </p>
            <Button asChild>
              <Link href="/contact" aria-label="Contact to learn more about qualifications">
                Get in Touch
              </Link>
            </Button>
          </div>
        </section>
      )}
    </main>
  )
}