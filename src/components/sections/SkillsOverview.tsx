'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Database, Globe, Smartphone, Brain, Wrench } from 'lucide-react'

interface Skill {
  name: string
  level: number
  category: string
  icon?: string
}

interface SkillCategory {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend Development',
    icon: Globe,
    color: 'text-blue-600 dark:text-blue-400',
    skills: [
      { name: 'React/Next.js', level: 95, category: 'frontend' },
      { name: 'TypeScript', level: 90, category: 'frontend' },
      { name: 'Tailwind CSS', level: 88, category: 'frontend' },
      { name: 'Vue.js', level: 80, category: 'frontend' },
    ],
  },
  {
    name: 'Backend Development',
    icon: Database,
    color: 'text-green-600 dark:text-green-400',
    skills: [
      { name: 'Node.js', level: 92, category: 'backend' },
      { name: 'Python', level: 88, category: 'backend' },
      { name: 'PostgreSQL', level: 85, category: 'backend' },
      { name: 'MongoDB', level: 82, category: 'backend' },
    ],
  },
  {
    name: 'Mobile Development',
    icon: Smartphone,
    color: 'text-purple-600 dark:text-purple-400',
    skills: [
      { name: 'React Native', level: 85, category: 'mobile' },
      { name: 'Flutter', level: 78, category: 'mobile' },
      { name: 'iOS (Swift)', level: 75, category: 'mobile' },
      { name: 'Android (Kotlin)', level: 72, category: 'mobile' },
    ],
  },
  {
    name: 'AI & Machine Learning',
    icon: Brain,
    color: 'text-orange-600 dark:text-orange-400',
    skills: [
      { name: 'TensorFlow', level: 88, category: 'ai' },
      { name: 'PyTorch', level: 85, category: 'ai' },
      { name: 'Scikit-learn', level: 90, category: 'ai' },
      { name: 'OpenAI APIs', level: 82, category: 'ai' },
    ],
  },
  {
    name: 'Programming Languages',
    icon: Code,
    color: 'text-red-600 dark:text-red-400',
    skills: [
      { name: 'JavaScript', level: 95, category: 'languages' },
      { name: 'Python', level: 92, category: 'languages' },
      { name: 'Java', level: 85, category: 'languages' },
      { name: 'C++', level: 80, category: 'languages' },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: Wrench,
    color: 'text-indigo-600 dark:text-indigo-400',
    skills: [
      { name: 'Docker', level: 88, category: 'devops' },
      { name: 'AWS', level: 85, category: 'devops' },
      { name: 'Git/GitHub', level: 95, category: 'devops' },
      { name: 'CI/CD', level: 82, category: 'devops' },
    ],
  },
]

interface SkillBarProps {
  skill: Skill
  delay: number
}

function SkillBar({ skill, delay }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(barRef, { once: true, margin: '-50px' })

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay: delay * 0.1,
            ease: 'easeOut'
          }}
        />
      </div>
    </div>
  )
}

export default function SkillsOverview() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
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

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="heading-2 mb-4">
            Technical Expertise
          </motion.h2>
          <motion.p variants={itemVariants} className="body-large max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels 
            across various domains of software development and research.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            const isActive = activeCategory === category.name

            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="group"
                onHoverStart={() => setActiveCategory(category.name)}
                onHoverEnd={() => setActiveCategory(null)}
              >
                <div className={`card-hover h-full transition-all duration-300 ${
                  isActive ? 'ring-2 ring-primary-500 shadow-lg' : ''
                }`}>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        delay={categoryIndex * 2 + skillIndex}
                      />
                    ))}
                  </div>

                  {/* Category Stats */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Average Proficiency
                      </span>
                      <span className={`font-semibold ${category.color}`}>
                        {Math.round(
                          category.skills.reduce((acc, skill) => acc + skill.level, 0) /
                          category.skills.length
                        )}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 text-center"
        >
          <p className="body text-gray-600 dark:text-gray-400 mb-6">
            Interested in working together? Let&apos;s discuss how these skills can benefit your project.
          </p>
          <motion.a
            href="/contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}