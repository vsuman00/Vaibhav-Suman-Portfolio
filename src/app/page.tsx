import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import FeaturedPublications from '@/components/sections/FeaturedPublications'
import SkillsOverview from '@/components/sections/SkillsOverview'
import StatsSection from '@/components/sections/StatsSection'
import CTASection from '@/components/sections/CTASection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <StatsSection />
      </Suspense>

      {/* Skills Overview */}
      <Suspense fallback={<LoadingSpinner />}>
        <SkillsOverview />
      </Suspense>

      {/* Featured Projects */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProjects />
      </Suspense>

      {/* Featured Publications */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedPublications />
      </Suspense>

      {/* Call to Action */}
      <CTASection />
    </div>
  )
}