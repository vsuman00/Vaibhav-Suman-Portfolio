# Correctly define and save the final detailed PRD markdown file

final_prd_content = """

# 📄 Developer Portfolio – Final & Detailed Product Requirement Document (PRD)

**Author:** Vaibhav Suman  
**Date:** 2025-09-12  
**Version:** 2.0 – Detailed for Automated Development

---

## ✅ 1. Project Overview

This document defines the architecture, UI/UX design, data structure, security, SEO, and deployment plan for the personal portfolio of Vaibhav Suman. The portfolio will serve as a comprehensive platform to showcase his expertise in **Software Development** and **ML/AI**, targeting a wide audience of recruiters, collaborators, and tech communities.

It is designed to be implemented efficiently using **Agent Mode of any IDE**, with structured data and modular code generation in mind.

---

## ✅ 2. Goals & Objectives

- Build a scalable, maintainable, and accessible portfolio website
- Integrate Sanity.io CMS for dynamic content management
- Ensure responsiveness across all devices
- Provide SEO optimization, analytics fallback, and privacy compliance
- Automate error handling, validation, and logging mechanisms
- Provide clear guidelines for deployment, environment setup, and content structure

---

## ✅ 3. User Stories

### As a visitor:

- I want to quickly learn about Vaibhav’s skills, achievements, and projects
- I want to view detailed project descriptions and research publications
- I want to contact Vaibhav securely and easily
- I want the site to be visually appealing, fast, and accessible

### As Vaibhav:

- I want an editable CMS to update content without redeploying
- I want the site to reflect both software engineering and ML/AI expertise equally
- I want SEO optimization and privacy compliance out of the box
- I want to use IDE automation (Agent Mode) to generate code without errors

---

## ✅ 4. Functional Requirements

### ✅ Content Sections

- **Home** – Hero section, intro, key stats, navigation
- **About Me** – Bio, skills with progress bars or tags
- **Projects** – Interactive, filterable cards with images, descriptions, and links
- **Publications** – Academic work with download options
- **Certifications** – Timeline or grid with course links
- **Experience** – Work history with role-specific accomplishments
 
- **Contact** – Form with validation, consent checkbox, error handling
- **Resume Download** – PDF file link

### ✅ Non-Functional Requirements

- Performance: Page load under 3s on 4G
- Accessibility: WCAG 2.1 AA compliance
- SEO: Meta tags, Open Graph, schema markup
- Security: GDPR compliance, HTTPS, spam protection
- Maintainability: CMS for structured content updates
- Scalability: Modular codebase supporting new sections easily

---

## ✅ 5. Data Structure – Sanity.io Schema

### Skills

\`\`\`json
{
"name": "skill",
"type": "document",
"fields": [
{"name": "name", "type": "string"},
{"name": "category", "type": "string"},
{"name": "level", "type": "number"}
]
}
\`\`\`

### Projects

\`\`\`json
{
"name": "project",
"type": "document",
"fields": [
{"name": "title", "type": "string"},
{"name": "description", "type": "text"},
{"name": "technologies", "type": "array", "of": [{"type": "string"}]},
{"name": "githubLink", "type": "url"},
{"name": "demoLink", "type": "url"},
{"name": "image", "type": "image"}
]
}
\`\`\`

### Publications

\`\`\`json
{
"name": "publication",
"type": "document",
"fields": [
{"name": "title", "type": "string"},
{"name": "journal", "type": "string"},
{"name": "link", "type": "url"},
{"name": "date", "type": "datetime"}
]
}
\`\`\`

 

### Contact Messages

\`\`\`json
{
"name": "contactMessage",
"type": "document",
"fields": [
{"name": "name", "type": "string"},
{"name": "email", "type": "email"},
{"name": "message", "type": "text"},
{"name": "consent", "type": "boolean"},
{"name": "submittedAt", "type": "datetime"}
]
}
\`\`\`

---

## ✅ 6. API Endpoints (Next.js)

### GET /api/projects

- Returns all projects with filters for tech stack

### GET /api/publications

- Returns list of publications sorted by date

### GET /api/skills

- Returns skills grouped by category

 

### POST /api/contact

- Receives contact form data
- Validates consent
- Sanitizes inputs
- Stores data in Sanity or forwards to email service

---

## ✅ 7. Styling Guidelines

- Use Tailwind CSS with dark/light themes
- Define typography scale: h1–h4, body text, captions
- Consistent padding and spacing across sections
- Accessible color contrast ratios (minimum 4.5:1 for text)
- Animation guidelines: subtle fades, slide-ins, hover states
- Use framer-motion for component transitions where applicable

---

## ✅ 8. Accessibility Checklist

- Keyboard navigation across all links and forms
- Form inputs with labels and error messages
- Skip navigation link at the top
- Alt attributes for all images
- Semantic HTML (header, main, footer, section)
- High contrast mode tested
- Responsive layout adjustments for screen readers

---

## ✅ 9. SEO Specifications

- Unique meta titles and descriptions per page
- Open Graph for social media sharing (image, title, description)
- JSON-LD structured data for professional profile
- Sitemap generation script
- robots.txt allowing indexing except staging environments

---

## ✅ 10. Security & Privacy

- HTTPS enabled by default via Vercel or Netlify
- Contact form validated to prevent spam injections
- GDPR compliance with explicit consent checkbox
- Privacy policy accessible from footer
- Data stored only as required and cleaned regularly

---

## ✅ 11. Deployment

### Environment Variables

- SANITY_PROJECT_ID
- SANITY_DATASET
- NEXT_PUBLIC_API_URL
- EMAIL_SERVICE_API_KEY (if using email notifications)

### Deployment Steps

1. Set up GitHub repository
2. Configure environment variables in Vercel or Netlify
3. Link Sanity.io dataset and API keys
4. Run build & test scripts before deployment
5. Enable automatic deployments from main branch

---

## ✅ 12. Testing Strategy

- Unit tests for API validation
- Accessibility testing with Lighthouse
- Performance audits (page load speed)
- Cross-browser testing
- Form submission and spam filtering tests

---

## ✅ 13. Edge Cases & Fallbacks

- Show placeholder content if API call fails
- Display error message on form validation failure
- Graceful fallback for images not loading
- Dark mode toggle defaults to system settings
- Offline page with cached assets

---

## ✅ 14. Final Notes

This PRD is designed to fully guide automated development in IDE Agent Mode while ensuring maintainability, security, SEO optimization, and accessibility. Each section is detailed with schemas, endpoints, validations, and deployment processes to create an efficient, error-free, and scalable portfolio tailored to Vaibhav Suman’s career growth.

---

"""
