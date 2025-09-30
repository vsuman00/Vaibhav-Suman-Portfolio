"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Publications", href: "/publications" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/vsuman00",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/vaibhav-suman",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:dev.vaibhav01@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <footer
      className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center space-x-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
                aria-label="Portfolio - Go to homepage"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span
                    className="text-white font-bold text-lg"
                    aria-hidden="true"
                  >
                    P
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Portfolio
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                A passionate researcher and developer focused on creating
                innovative solutions and sharing knowledge through publications
                and open-source contributions.
              </p>

              {/* Social Links */}
              <div
                className="flex space-x-4"
                role="group"
                aria-label="Social media links"
              >
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      aria-label={`Visit ${item.name} profile (opens in new tab)`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <nav aria-labelledby="footer-navigation-heading">
              <h3
                id="footer-navigation-heading"
                className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4"
              >
                Navigation
              </h3>
              <ul className="space-y-3" role="list">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Links */}
            <nav aria-labelledby="footer-quicklinks-heading">
              <h3
                id="footer-quicklinks-heading"
                className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4"
              >
                Quick Links
              </h3>
              <ul className="space-y-3" role="list">
                <li>
                  <a
                    href="https://drive.google.com/file/d/1B5Rp5d0r27bQkinCdM7sGLZOuv-ZuuXT/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md flex items-center space-x-1"
                    aria-label="Download resume (opens in new tab)"
                  >
                    <span>Resume</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>

                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} Vaibhav&apos;s Portfolio. Made for</span>
              <Heart
                className="h-4 w-4 text-red-500 fill-current"
                aria-label="love"
              />
              <span>Developer</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <span>Last updated: {lastUpdated}</span>
              <a
                href="https://github.com/vsuman00/Vaibhav-Suman-Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md flex items-center space-x-1"
                aria-label="View source code on GitHub (opens in new tab)"
              >
                <span>View Source</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
