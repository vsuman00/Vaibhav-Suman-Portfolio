"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  User,
  GraduationCap,
  Award,
  Heart,
  MapPin,
  Mail,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  ChevronUp,
  Star,
  Target,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

interface Skill {
  name: string;
  level: number;
  category: string;
  yearsOfExperience: number;
  projects: number;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "work" | "freelance" | "internship";
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  relevantCourses: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "award" | "certification" | "publication" | "speaking";
  issuer?: string;
  link?: string;
}

// Mock data - in real app, this would come from Sanity CMS
const personalInfo = {
  name: "Vaibhav Suman",
  title: "Full Stack Developer & AI/ML Engineer",
  location: "Bangalore, India",
  email: "vaibhavsuman@gmail.com",
  bio: `I&apos;m a passionate full-stack developer with over 5 years of experience building scalable web applications and AI-powered solutions. My journey in technology started with a curiosity about how things work, which led me to pursue computer science and eventually specialize in modern web technologies and machine learning.

I believe in writing clean, maintainable code and creating user experiences that make a difference. When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing and speaking at conferences.`,
  interests: [
    "Artificial Intelligence & Machine Learning",
    "Open Source Contributions",
    "Technical Writing & Blogging",
    "Photography & Visual Arts",
    "Hiking & Outdoor Adventures",
    "Coffee & Specialty Brewing",
    "Reading Sci-Fi Novels",
    "Playing Guitar",
  ],
  socialLinks: {
    github: "https://github.com/vsuman00",
    linkedin: "https://linkedin.com/in/vaibhav-suman",
    twitter: "https://twitter.com/vaibhavsuman00",
  },
};

const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    level: 95,
    category: "Frontend",
    yearsOfExperience: 2,
    projects: 5,
  },
  {
    name: "Next.js",
    level: 90,
    category: "Frontend",
    yearsOfExperience: 2,
    projects: 5,
  },
  {
    name: "TypeScript",
    level: 88,
    category: "Frontend",
    yearsOfExperience: 2,
    projects: 10,
  },
  {
    name: "Vue.js",
    level: 80,
    category: "Frontend",
    yearsOfExperience: 2,
    projects: 4,
  },
  {
    name: "Tailwind CSS",
    level: 92,
    category: "Frontend",
    yearsOfExperience: 2,
    projects: 13,
  },

  // Backend
  {
    name: "Node.js",
    level: 90,
    category: "Backend",
    yearsOfExperience: 1,
    projects: 5,
  },
  {
    name: "Python",
    level: 85,
    category: "Backend",
    yearsOfExperience: 2,
    projects: 4,
  },
  {
    name: "PostgreSQL",
    level: 82,
    category: "Backend",
    yearsOfExperience: 1,
    projects: 3,
  },
  {
    name: "MongoDB",
    level: 78,
    category: "Backend",
    yearsOfExperience: 2,
    projects: 6,
  },
  {
    name: "GraphQL",
    level: 75,
    category: "Backend",
    yearsOfExperience: 0.5,
    projects: 2,
  },

  // AI/ML
  {
    name: "TensorFlow",
    level: 80,
    category: "AI/ML",
    yearsOfExperience: 1,
    projects: 6,
  },
  {
    name: "PyTorch",
    level: 75,
    category: "AI/ML",
    yearsOfExperience: 1,
    projects: 4,
  },
  {
    name: "OpenAI API",
    level: 88,
    category: "AI/ML",
    yearsOfExperience: 1,
    projects: 4,
  },

  // DevOps
  {
    name: "Docker",
    level: 85,
    category: "DevOps",
    yearsOfExperience: 1,
    projects: 3,
  },
  {
    name: "AWS",
    level: 80,
    category: "DevOps",
    yearsOfExperience: 0.5,
    projects: 2,
  },
  {
    name: "Kubernetes",
    level: 70,
    category: "DevOps",
    yearsOfExperience: 0.5,
    projects: 2,
  },
];

const experiences: Experience[] = [
  {
    id: "1",
    title: "Full Stack Developer",
    company: "Freelance",
    location: "Bangalore, India",
    startDate: "2024-10",
    description:
      "Led development of scalable web applications serving 10+ users, focusing on performance optimization and user experience.",
    achievements: [
      "Engineered full-stack applications using React.js, Next.js, Node.js, and MongoDB",
      "Designed responsive UI/UX interfaces with Figma and Tailwind CSS",
      "Deployed scalable APIs and integrated PostgreSQL and Django for backend systems",
      "Prototyped AI-based features using machine learning and deep learning models",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "TypeScript",
    ],
    type: "work",
  },
  {
    id: "2",
    title: "Machine Learning Intern",
    company: "NIT Bhopal",
    location: "Bhopal, India",
    startDate: "2023-11",
    endDate: "2024-05",
    description:
      "Contributed to building scalable ML-driven applications with a focus on performance optimization, debugging, and automated monitoring. Collaborated in Agile teams to enhance data pipelines and ensure robust system uptime.",
    achievements: [
      "Automated monitoring and alerting using UNIX, Docker, and AWS CloudWatch, reducing downtime by 25%",
      "Wrote optimized SQL/PL SQL queries improving data processing efficiency",
      "Deployed ML models such as Bi-LSTM for fake news detection achieving 98% accuracy",
      "Enhanced image classification models, reducing latency by 40% and improving accuracy by 30%",
      "Mentored junior developers and conducted code reviews to improve engineering practices",
    ],
    technologies: [
      "Python",
      "SQL",
      "TensorFlow",
      "Pandas",
      "NumPy",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "Quantum Machine Learning",
    ],
    type: "work",
  },
];

const education: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Technology in CSE/AIML",
    institution: "LNCT University",
    location: "Bhopal, India",
    startDate: "2020-09",
    endDate: "2024-05",
    gpa: "3.7/4.0",
    honors: ["Hackathon Winner"],
    relevantCourses: [
      "Data Structures & Algorithms",
      "Object Oriented Programming",
      "Machine Learning",
      "Operating Systems",
      "Computer Networks",
      "Software Design",
    ],
  },
];

const achievements: Achievement[] = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect",
    description:
      "Professional level certification demonstrating expertise in designing distributed systems on AWS.",
    date: "2023-08",
    category: "certification",
    issuer: "Amazon Web Services",
  },
  {
    id: "2",
    title: "Winner - Kavach Cyber Security Hackathon, 2023",
    description:
      "Designed a secure chat messenger decryption tool for MHA, focusing on system resilience",
    date: "2023-08",
    category: "award",
    issuer: "AICTE  and Ministry of Education",
  },
  {
    id: "3",
    title: "Open Source Hackathon",
    description:
      "Top 6% Global Hackathon Rank: Recognized for innovative problem-solving and collaborative effort.",
    date: "2023-04",
    category: "award",
    issuer: "Major League Hacking",
  },
  {
    id: "4",
    title: "IBM Full Stack Software Developer Professional Certificate",
    description:
      "Presented at ReactConf 2022 to an audience of 500+ developers.",
    date: "2022-10",
    category: "certification",
    issuer: "Coursera",
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const skillId = `skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`;
  const detailsId = `${skillId}-details`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-controls={detailsId}
      aria-label={`${skill.name} skill details, ${skill.level}% proficiency. ${isExpanded ? "Collapse" : "Expand"} for more information`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4
          id={skillId}
          className="font-semibold text-gray-900 dark:text-white"
        >
          {skill.name}
        </h4>
        <div className="flex items-center space-x-2">
          <span
            className="text-sm font-medium text-primary-600 dark:text-primary-400"
            aria-label={`Proficiency level: ${skill.level} percent`}
          >
            {skill.level}%
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </div>
      </div>

      <div
        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={skillId}
      >
        <motion.div
          className="bg-primary-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      <motion.div
        id={detailsId}
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
        aria-hidden={!isExpanded}
      >
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div
            className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400"
            role="group"
            aria-label="Skill statistics"
          >
            <div>
              <span className="font-medium">Experience:</span>{" "}
              {skill.yearsOfExperience} years
            </div>
            <div>
              <span className="font-medium">Projects:</span> {skill.projects}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const experienceId = `experience-${experience.id}`;
  const achievementsId = `${experienceId}-achievements`;
  const technologiesId = `${experienceId}-technologies`;

  const getTypeColor = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "freelance":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "internship":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
      role="article"
      aria-labelledby={experienceId}
    >
      {/* Timeline connector */}
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
        aria-hidden="true"
      />
      <div
        className="absolute left-2 top-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900"
        aria-hidden="true"
      />

      <div className="ml-12 card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
          <div>
            <h3
              id={experienceId}
              className="text-xl font-semibold text-gray-900 dark:text-white mb-1"
            >
              {experience.title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
              {experience.company} • {experience.location}
            </p>
            <div className="flex items-center space-x-2">
              <time
                className="text-sm text-gray-600 dark:text-gray-400"
                dateTime={experience.startDate}
              >
                {experience.startDate} - {experience.endDate || "Present"}
              </time>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(experience.type)}`}
                role="status"
                aria-label={`Position type: ${experience.type}`}
              >
                {experience.type.charAt(0).toUpperCase() +
                  experience.type.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {experience.description}
        </p>

        <div className="mb-4" role="region" aria-labelledby={achievementsId}>
          <h4
            id={achievementsId}
            className="font-medium text-gray-900 dark:text-white mb-2"
          >
            Key Achievements:
          </h4>
          <ul className="space-y-1" role="list">
            {experience.achievements.map((achievement, i) => (
              <li
                key={i}
                className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                role="listitem"
              >
                <div
                  className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby={technologiesId}
        >
          <span id={technologiesId} className="sr-only">
            Technologies used:
          </span>
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              role="listitem"
              aria-label={`Technology: ${tech}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutClient() {
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const skillCategories = [
    "All",
    ...Array.from(new Set(skills.map((skill) => skill.category))),
  ];

  const filteredSkills =
    activeSkillCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeSkillCategory);

  return (
    <main
      ref={sectionRef}
      className="py-16 sm:py-24"
      role="main"
      aria-label="About page content"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
          aria-labelledby="hero-heading"
        >
          <div
            className="relative w-32 h-32 mx-auto mb-8"
            role="img"
            aria-label="Profile avatar"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center">
              <User
                className="h-16 w-16 text-primary-600 dark:text-primary-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <h1 id="hero-heading" className="heading-1 mb-4">
            {personalInfo.name}
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-6">
            {personalInfo.title}
          </p>
          <div
            className="flex items-center justify-center space-x-6 text-gray-600 dark:text-gray-400 mb-8"
            role="group"
            aria-label="Contact information"
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
                aria-label={`Send email to ${personalInfo.email}`}
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div
            className="flex items-center justify-center space-x-4 mb-8"
            role="group"
            aria-label="Social media links"
          >
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
              aria-label="Visit GitHub profile (opens in new tab)"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
              aria-label="Visit LinkedIn profile (opens in new tab)"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={personalInfo.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
              aria-label="Visit Twitter profile (opens in new tab)"
            >
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <button
            className="btn-primary inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Download resume PDF"
          >
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Download Resume
          </button>
        </motion.section>

        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
          aria-labelledby="bio-heading"
        >
          <div className="max-w-4xl mx-auto">
            <h2 id="bio-heading" className="heading-2 text-center mb-8">
              About Me
            </h2>
            <div
              className="prose prose-lg dark:prose-invert mx-auto"
              role="region"
              aria-label="Personal biography"
            >
              {personalInfo.bio.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
          aria-labelledby="skills-heading"
        >
          <div className="text-center mb-12">
            <h2 id="skills-heading" className="heading-2 mb-4">
              Technical Skills
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              Here&apos;s a comprehensive overview of my technical expertise across
              different domains.
            </p>
          </div>

          {/* Skill Category Filter */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-8"
            role="group"
            aria-label="Skill category filters"
          >
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                  activeSkillCategory === category
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                aria-pressed={activeSkillCategory === category}
                aria-label={`Filter skills by ${category} category`}
              >
                {category}
              </button>
            ))}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label={`${filteredSkills.length} skills in ${activeSkillCategory === "All" ? "all categories" : activeSkillCategory + " category"}`}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                role="listitem"
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Professional Experience</h2>
            <p className="body-large max-w-3xl mx-auto">
              My journey through various roles and the impact I&apos;ve made along
              the way.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
          role="region"
          aria-labelledby="education-heading"
        >
          <div className="text-center mb-12">
            <h2 id="education-heading" className="heading-2 mb-4">
              Education
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              My academic background and the foundation that shaped my technical
              expertise.
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            role="list"
            aria-label="Educational background"
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="card p-6"
                role="listitem"
                aria-labelledby={`education-${edu.id}-title`}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <GraduationCap
                      className="h-6 w-6 text-primary-600 dark:text-primary-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      id={`education-${edu.id}-title`}
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {edu.location} •{" "}
                      <time dateTime={`${edu.startDate}/${edu.endDate}`}>
                        {edu.startDate} - {edu.endDate}
                      </time>
                    </p>
                    {edu.gpa && (
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                        role="status"
                        aria-label={`Grade Point Average: ${edu.gpa}`}
                      >
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                </div>

                {edu.honors && edu.honors.length > 0 && (
                  <div
                    className="mb-4"
                    role="region"
                    aria-labelledby={`education-${edu.id}-honors`}
                  >
                    <h4
                      id={`education-${edu.id}-honors`}
                      className="font-medium text-gray-900 dark:text-white mb-2"
                    >
                      Honors:
                    </h4>
                    <div
                      className="flex flex-wrap gap-2"
                      role="list"
                      aria-label="Academic honors and awards"
                    >
                      {edu.honors.map((honor) => (
                        <span
                          key={honor}
                          className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded"
                          role="listitem"
                        >
                          {honor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  role="region"
                  aria-labelledby={`education-${edu.id}-courses`}
                >
                  <h4
                    id={`education-${edu.id}-courses`}
                    className="font-medium text-gray-900 dark:text-white mb-2"
                  >
                    Relevant Courses:
                  </h4>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Relevant academic courses"
                  >
                    {edu.relevantCourses.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        role="listitem"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
          role="region"
          aria-labelledby="achievements-heading"
        >
          <div className="text-center mb-12">
            <h2 id="achievements-heading" className="heading-2 mb-4">
              Achievements & Recognition
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              Awards, certifications, and recognition I&apos;ve received throughout
              my career.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
            role="list"
            aria-label="Professional achievements and recognition"
          >
            {achievements.map((achievement, index) => {
              const getIcon = (category: Achievement["category"]) => {
                switch (category) {
                  case "award":
                    return Award;
                  case "certification":
                    return Star;
                  case "publication":
                    return Lightbulb;
                  case "speaking":
                    return Target;
                  default:
                    return Award;
                }
              };

              const Icon = getIcon(achievement.category);

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card p-6 hover:shadow-lg transition-shadow"
                  role="listitem"
                  aria-labelledby={`achievement-${achievement.id}-title`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg flex-shrink-0">
                      <Icon
                        className="h-6 w-6 text-primary-600 dark:text-primary-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        id={`achievement-${achievement.id}-title`}
                        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                      >
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.issuer && (
                            <span className="block">{achievement.issuer}</span>
                          )}
                          <time dateTime={achievement.date}>
                            {achievement.date}
                          </time>
                        </div>
                        {achievement.link && (
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
                            aria-label={`View details for ${achievement.title} (opens in new tab)`}
                          >
                            <ExternalLink
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Interests Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
          role="region"
          aria-labelledby="interests-heading"
        >
          <div className="text-center mb-12">
            <h2 id="interests-heading" className="heading-2 mb-4">
              Personal Interests
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              When I&apos;m not coding, here&apos;s what keeps me inspired and motivated.
            </p>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            role="list"
            aria-label="Personal interests and hobbies"
          >
            {personalInfo.interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card p-4 text-center hover:shadow-md transition-shadow"
                role="listitem"
              >
                <Heart
                  className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto mb-2"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {interest}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
          role="region"
          aria-labelledby="cta-heading"
        >
          <div className="card p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <h2 id="cta-heading" className="heading-2 mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects.
              Let&apos;s discuss how we can create something amazing together.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              role="group"
              aria-label="Contact actions"
            >
              <Link
                href="/contact"
                className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Navigate to contact page"
              >
                Get In Touch
              </Link>
              <Link href="/projects" className="btn-secondary">
                View My Work
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
