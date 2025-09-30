"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Calendar,
  Download,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/vsuman00",
    color: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/vaibhav-suman",
    color: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/vaibhavsuman00",
    color: "hover:text-blue-400 dark:hover:text-blue-300",
  },
];

const quickActions = [
  {
    title: "Download Resume",
    description: "Get my latest CV with detailed experience and skills",
    icon: Download,
    href: "https://drive.google.com/file/d/1B5Rp5d0r27bQkinCdM7sGLZOuv-ZuuXT/view?usp=sharing",
    primary: false,
    external: true,
  },
  {
    title: "Schedule a Call",
    description: "Book a 30-minute consultation to discuss your project",
    icon: Calendar,
    href: "https://calendly.com/vaibhavsuman",
    primary: false,
    external: true,
  },
  {
    title: "Send Message",
    description: "Drop me a line about collaboration opportunities",
    icon: Mail,
    href: "/contact",
    primary: true,
    external: false,
  },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/20 dark:via-gray-900 dark:to-secondary-900/20" />

      {/* Floating Background Shapes */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-10 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute top-20 right-20 w-16 h-16 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-20"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent-200 dark:bg-accent-800 rounded-full opacity-20"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Main CTA Content */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="heading-2 mb-6">
              Ready to Build Something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                Amazing Together?
              </span>
            </h2>
            <p className="body-large max-w-3xl mx-auto mb-8">
              Whether you&apos;re looking to collaborate on cutting-edge
              research, build innovative applications, or discuss the latest in
              AI and technology, I&apos;d love to hear from you.
            </p>

            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Mail className="h-5 w-5" />
                <span>Let&apos;s Connect</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const Component = action.external ? "a" : Link;
                const linkProps = action.external
                  ? {
                      href: action.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : { href: action.href };

                return (
                  <motion.div
                    key={action.title}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Component
                      {...linkProps}
                      className={`block p-6 rounded-xl border-2 transition-all duration-300 ${
                        action.primary
                          ? "border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                          action.primary
                            ? "bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        } group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {action.description}
                      </p>
                    </Component>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Connect on Social Media
            </h3>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for new projects</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Get notified about new projects, publications, and tech
                insights.
              </p>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
