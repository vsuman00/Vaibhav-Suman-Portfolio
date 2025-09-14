import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'
import { generateBlogPostMetadata, generateStructuredData } from '@/lib/seo'

// Mock data - in real app, this would come from Sanity CMS
const blogPosts = [
  {
    id: '1',
    title: 'Building Scalable React Applications with Next.js 14',
    excerpt: 'Learn how to leverage the latest features in Next.js 14 to build performant and scalable React applications with server components and improved routing.',
    slug: 'building-scalable-react-applications-nextjs-14',
    publishedAt: '2024-01-15',
    readingTime: 8,
    category: 'Web Development',
    tags: ['React', 'Next.js', 'Performance', 'Server Components'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg',
      bio: 'Full Stack Developer & AI Enthusiast'
    },
    coverImage: '/blog/nextjs-14.jpg',
    featured: true,
    views: 2450,
    likes: 89,
    comments: 23,
    content: `
# Building Scalable React Applications with Next.js 14

Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. In this comprehensive guide, we'll explore the latest capabilities and learn how to leverage them for maximum performance and scalability.

## What's New in Next.js 14

Next.js 14 brings several exciting features:

- **Server Actions**: Simplified server-side logic
- **Partial Prerendering**: Hybrid static and dynamic rendering
- **Improved App Router**: Enhanced routing capabilities
- **Turbopack**: Faster development builds

### Server Components Revolution

Server Components are game-changers for React applications. They allow us to:

1. **Reduce Bundle Size**: Server components don't ship JavaScript to the client
2. **Improve Performance**: Direct database access without API routes
3. **Better SEO**: Server-side rendering by default

\`\`\`tsx
// Server Component Example
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug) // Direct database access
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
\`\`\`

### App Router Best Practices

The App Router provides a more intuitive way to structure your application:

- **File-based Routing**: Organize routes using the file system
- **Layouts**: Share UI between routes
- **Loading States**: Built-in loading UI
- **Error Boundaries**: Graceful error handling

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
\`\`\`

## Performance Optimization Strategies

### 1. Image Optimization

Next.js provides built-in image optimization:

\`\`\`tsx
import Image from 'next/image'

export function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // Load above the fold images first
      placeholder="blur" // Show blur while loading
    />
  )
}
\`\`\`

### 2. Code Splitting

Automatic code splitting ensures users only download what they need:

\`\`\`tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
\`\`\`

### 3. Caching Strategies

Implement effective caching for better performance:

\`\`\`tsx
// Static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  })
  
  return <div>{/* Render data */}</div>
}
\`\`\`

## Scalability Considerations

### Database Integration

For scalable applications, consider:

- **Connection Pooling**: Manage database connections efficiently
- **Query Optimization**: Use indexes and optimize queries
- **Caching Layer**: Implement Redis for frequently accessed data

### State Management

Choose the right state management solution:

- **React Context**: For simple, localized state
- **Zustand**: Lightweight alternative to Redux
- **Redux Toolkit**: For complex state management needs

### Monitoring and Analytics

Implement proper monitoring:

\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

## Deployment Best Practices

### Environment Configuration

\`\`\`bash
# .env.local
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
\`\`\`

### CI/CD Pipeline

Set up automated deployment:

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
\`\`\`

## Conclusion

Next.js 14 provides powerful tools for building scalable React applications. By leveraging Server Components, optimizing performance, and following best practices, you can create applications that scale efficiently and provide excellent user experiences.

The key is to start with a solid foundation and gradually optimize as your application grows. Remember to monitor performance, implement proper caching strategies, and keep your dependencies up to date.

### What's Next?

In upcoming articles, we'll dive deeper into:

- Advanced Server Actions patterns
- Database optimization techniques
- Real-world deployment strategies
- Performance monitoring and debugging

Stay tuned for more insights on building modern web applications!
    `
  },
  {
    id: '2',
    title: 'The Future of AI in Web Development',
    excerpt: 'Exploring how artificial intelligence is transforming the way we build web applications, from code generation to automated testing and deployment.',
    slug: 'future-ai-web-development',
    publishedAt: '2024-01-10',
    readingTime: 12,
    category: 'Artificial Intelligence',
    tags: ['AI', 'Machine Learning', 'Automation', 'Future Tech'],
    author: {
      name: 'Your Name',
      avatar: '/avatar.jpg',
      bio: 'Full Stack Developer & AI Enthusiast'
    },
    coverImage: '/blog/ai-web-dev.jpg',
    featured: true,
    views: 3200,
    likes: 156,
    comments: 45,
    content: `
# The Future of AI in Web Development

Artificial Intelligence is revolutionizing every aspect of web development. From code generation to automated testing, AI tools are becoming indispensable for modern developers. Let's explore how AI is shaping the future of our industry.

## Current AI Tools in Development

### Code Generation

AI-powered code generation tools are becoming increasingly sophisticated:

- **GitHub Copilot**: AI pair programmer
- **ChatGPT**: Code explanation and generation
- **Tabnine**: Intelligent code completion
- **Replit Ghostwriter**: Full-stack AI assistant

\`\`\`javascript
// AI can generate complex functions from simple comments
// Generate a function to validate email addresses
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
\`\`\`

### Automated Testing

AI is transforming how we approach testing:

\`\`\`javascript
// AI-generated test cases
describe('Email Validation', () => {
  test('should validate correct email format', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
  
  test('should reject invalid email format', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
\`\`\`

## Emerging AI Applications

### Design to Code

AI tools can now convert designs directly to code:

- **Figma to Code**: Automated component generation
- **Sketch to React**: Design system integration
- **Adobe XD plugins**: Seamless design handoff

### Performance Optimization

AI analyzes your code and suggests optimizations:

\`\`\`javascript
// Before: Inefficient code
const processData = (data) => {
  return data.map(item => {
    return data.filter(d => d.category === item.category)
  })
}

// After: AI-optimized version
const processData = (data) => {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})
  return Object.values(grouped)
}
\`\`\`

## The Road Ahead

### Intelligent Development Environments

Future IDEs will feature:

- **Context-aware suggestions**: Understanding your entire codebase
- **Automated refactoring**: Safe code improvements
- **Bug prediction**: Identifying issues before they occur
- **Documentation generation**: Automatic API docs

### AI-Powered Deployment

Deployment will become fully automated:

\`\`\`yaml
# AI-optimized deployment configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: smart-app
spec:
  replicas: 3 # AI-determined optimal replica count
  selector:
    matchLabels:
      app: smart-app
  template:
    spec:
      containers:
      - name: app
        image: myapp:latest
        resources:
          requests:
            memory: "256Mi" # AI-optimized resource allocation
            cpu: "250m"
\`\`\`

## Challenges and Considerations

### Code Quality

While AI generates code quickly, developers must ensure:

- **Security**: AI-generated code may have vulnerabilities
- **Maintainability**: Code should be readable and well-structured
- **Testing**: Comprehensive test coverage remains crucial

### Ethical Implications

- **Job displacement**: How will AI affect developer roles?
- **Code ownership**: Who owns AI-generated code?
- **Bias**: Ensuring AI tools don't perpetuate biases

## Preparing for the AI Future

### Skills to Develop

1. **AI Tool Proficiency**: Learn to work with AI assistants
2. **Prompt Engineering**: Craft effective AI queries
3. **Code Review**: Evaluate AI-generated code critically
4. **System Design**: Focus on architecture and planning

### Best Practices

\`\`\`javascript
// Always review and test AI-generated code
const aiGeneratedFunction = (input) => {
  // AI-generated logic here
  return processedOutput
}

// Add comprehensive tests
test('AI function works correctly', () => {
  const result = aiGeneratedFunction(testInput)
  expect(result).toEqual(expectedOutput)
})
\`\`\`

## Conclusion

AI is not replacing developers—it's augmenting our capabilities. The future belongs to developers who can effectively collaborate with AI tools while maintaining code quality and system reliability.

As we move forward, the key is to embrace these tools while developing the skills needed to guide and validate AI-generated solutions. The future of web development is bright, and AI will be our powerful ally in building better applications faster.

### What's Coming Next?

In future articles, we'll explore:

- Hands-on AI tool comparisons
- Building AI-powered applications
- Ethical AI development practices
- The evolving role of developers in an AI world

Stay curious and keep learning!
    `
  }
  // Add more blog posts as needed
]

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Your Name',
      description: 'The requested blog post could not be found.'
    }
  }
  
  // Transform post data to match expected format for SEO function
  const seoPost = {
    title: post.title,
    description: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.publishedAt,
    author: post.author.name,
    tags: post.tags,
    image: post.coverImage,
    slug: post.slug,
    wordCount: post.content.split(' ').length
  }
  
  return generateBlogPostMetadata(seoPost)
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    notFound()
  }

  // Generate structured data for the blog post
  const articleStructuredData = generateStructuredData('article', {
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: post.author.name,
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    url: `https://johndoe.dev/blog/${post.slug}`,
    keywords: post.tags,
    section: post.category,
    wordCount: post.content.split(' ').length
  })
  
  return (
    <>
      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <BlogPostClient post={post} />
    </>
  )
}