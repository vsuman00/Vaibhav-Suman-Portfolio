import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  url?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: string[];
}

const defaultSEO: SEOConfig = {
  title: "Vaibhav Suman - Full Stack Developer & AI/ML Engineer",
  description:
    "Experienced Full Stack Developer and AI/ML Engineer specializing in React, Node.js, Python, and modern web technologies. Building scalable applications with AI integration and delivering exceptional user experiences.",
  keywords: [
    "Full Stack Developer",
    "AI/ML Engineer",
    "Machine Learning",
    "Artificial Intelligence",
    "Software Engineer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Deep Learning",
    "Neural Networks",
    "Portfolio",
    "Software Development",
    "Web Applications",
    "API Development",
    "Database Design",
    "Cloud Computing",
    "AWS",
    "DevOps",
    "Agile Development",
  ],
  author: "Vaibhav Suman",
  url: "https://vaibhavsuman.dev",
  image: "https://vaibhavsuman.dev/og-image.jpg",
  type: "website",
  locale: "en_US",
};

export function generateMetadata(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config };
  const baseUrl = seo.url || "https://vaibhavsuman.dev";

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(", "),
    authors: seo.author ? [{ name: seo.author }] : undefined,
    creator: seo.author,
    publisher: seo.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: seo.url,
      languages: seo.alternateLocales
        ? Object.fromEntries(
            seo.alternateLocales.map((locale) => [
              locale,
              `${baseUrl}/${locale}`,
            ])
          )
        : undefined,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.url,
      siteName: "Vaibhav Suman Portfolio",
      images: seo.image
        ? [
            {
              url: seo.image,
              width: 1200,
              height: 630,
              alt: seo.title,
            },
          ]
        : undefined,
      locale: seo.locale,
      type: seo.type || "website",
      publishedTime: seo.publishedTime,
      modifiedTime: seo.modifiedTime,
      section: seo.section,
      tags: seo.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: "@vaibhavsuman5",
      images: seo.image ? [seo.image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  };
}

interface StructuredDataInput {
  name?: string;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  authorName?: string;
  publishedTime?: string;
  modifiedTime?: string;
  readingTime?: number;
  keywords?: string[];
  section?: string;
  wordCount?: number;
  items?: Array<{ name: string; url: string }>;
  jobTitle?: string;
  email?: string;
  socialLinks?: string[];
  skills?: string[];
  technologies?: string[];
  completedDate?: string;
  category?: string;
  githubUrl?: string;
  liveUrl?: string;
  company?: string;
}

export function generateStructuredData(
  type: "person" | "website" | "article" | "breadcrumb",
  data: StructuredDataInput
) {
  const baseUrl = "https://vaibhavsuman.dev";

  switch (type) {
    case "person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: data.name || "Vaibhav Suman",
        url: baseUrl,
        image: data.image || `${baseUrl}/og-image.jpg`,
        jobTitle: data.jobTitle || "Full Stack Developer & AI/ML Engineer",
        worksFor: {
          "@type": "Organization",
          name: data.company || "Freelance",
        },
        alumniOf: [],
        knowsAbout: data.skills || [
          "Full Stack Development",
          "Machine Learning",
          "Artificial Intelligence",
          "React",
          "Node.js",
          "Python",
          "TypeScript",
        ],
        sameAs: data.socialLinks || [],
      };

    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: data.name || "Vaibhav Suman Portfolio",
        url: baseUrl,
        description: data.description || defaultSEO.description,
        author: {
          "@type": "Person",
          name: data.authorName || "Vaibhav Suman",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        author: {
          "@type": "Person",
          name: data.author || "Vaibhav Suman",
          url: baseUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Vaibhav Suman Portfolio",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/blog/${data.url?.split("/").pop() || ""}`,
        },
        keywords: data.keywords?.join(", "),
        wordCount: data.wordCount,
        timeRequired: data.readingTime ? `PT${data.readingTime}M` : undefined,
      };

    case "breadcrumb":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items?.map((item, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      };

    default:
      return null;
  }
}

export function generateBlogPostMetadata(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  author?: string;
  image?: string;
  readingTime?: number;
}): Metadata {
  const baseUrl = "https://vaibhavsuman.dev";
  const url = `${baseUrl}/blog/${post.slug}`;

  return generateMetadata({
    title: `${post.title} | Vaibhav Suman Blog`,
    description: post.description,
    url,
    image: post.image,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    tags: post.tags,
    author: post.author,
  });
}

export function generateProjectMetadata(project: {
  title: string;
  description: string;
  slug: string;
  technologies?: string[];
  image?: string;
}): Metadata {
  const baseUrl = "https://vaibhavsuman.dev";
  const url = `${baseUrl}/projects/${project.slug}`;

  return generateMetadata({
    title: `${project.title} | Vaibhav Suman Projects`,
    description: project.description,
    url,
    image: project.image,
    keywords: project.technologies,
  });
}

export function generateSitemapUrls() {
  const baseUrl = "https://vaibhavsuman.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: https://vaibhavsuman.dev/sitemap.xml`;
}

export { defaultSEO };
