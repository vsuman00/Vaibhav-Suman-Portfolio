import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AccessibilityProvider from "@/components/providers/AccessibilityProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { generateMetadata, generateStructuredData } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for the website and person
  const personStructuredData = generateStructuredData("person", {
    name: "Vaibhav Suman",
    jobTitle: "Full Stack Developer",
    description:
      "Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    url: "#",
    email: "dev.vaibhav01@gmail.com",
    socialLinks: [
      "https://linkedin.com/in/vaibhav-suman",
      "https://github.com/vsuman00",
      "https://twitter.com/vaibhavsuman00",
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Web Development",
      "Software Engineering",
      "Full Stack Development",
    ],
  });

  const websiteStructuredData = generateStructuredData("website", {
    name: "Vaibhav Suman Portfolio",
    description:
      "Professional portfolio showcasing full stack development projects, blog posts, and technical expertise.",
    url: "#",
    authorName: "Vaibhav Suman",
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for social media domains */}
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//twitter.com" />
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="32x32"
          href="/favicon-32x32.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/android-chrome-192x192.svg"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <AccessibilityProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div className="min-h-screen flex flex-col">
              {/* Skip to main content link */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Skip to main content
              </a>

              {/* Header with navigation */}
              <header role="banner">
                <Header />
              </header>

              {/* Main content area */}
              <main
                id="main-content"
                role="main"
                className="flex-1"
                tabIndex={-1}
              >
                {children}
              </main>

              {/* Footer */}
              <footer role="contentinfo">
                <Footer />
              </footer>
            </div>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
