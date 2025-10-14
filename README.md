# Vaibhav Suman Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Sanity CMS. This portfolio showcases projects, publications, certifications, and professional experience with a focus on performance, accessibility, and SEO optimization.

## 🚀 Features

### Core Features
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Content Management**: Integrated with Sanity CMS for easy content updates
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Dark/Light Theme**: Theme switching with system preference detection
- **Performance Optimized**: Image optimization, lazy loading, and code splitting
- **SEO Friendly**: Meta tags, structured data, and sitemap generation
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### Content Sections
- **Hero Section**: Dynamic role rotation with social links
- **Projects**: Showcase of development projects with filtering and search
- **Publications**: Academic and technical publications
- **Experience**: Professional work history and achievements
- **Certifications**: Professional certifications and credentials
- **Contact**: Contact form with email integration
- **Skills**: Technical skills with proficiency levels
- **Statistics**: Dynamic stats display

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Framer Motion**: Smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation
- **Syntax Highlighting**: Code blocks with syntax highlighting
- **Docker Support**: Containerized deployment with Docker Compose
- **CI/CD**: GitHub Actions workflow for automated deployment
- **Security Headers**: Enhanced security with proper HTTP headers
- **Health Checks**: Application health monitoring

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

### Backend & CMS
- **CMS**: Sanity Studio
- **Content**: Portable Text for rich content
- **Image Handling**: Sanity Image URLs with optimization

### Development Tools
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript compiler
- **Package Manager**: npm
- **Containerization**: Docker & Docker Compose

## 📦 Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vsuman00/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Portfolio: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

## 🐳 Docker Deployment

### Development Environment
```bash
docker-compose up portfolio-dev
```
Access at: http://localhost:3001

### Production Environment
```bash
docker-compose up portfolio
```
Access at: http://localhost:3000

### Docker Commands
```bash
# Build and start services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f portfolio
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎨 Customization

### Content Management
1. **Access Sanity Studio**: Navigate to `/studio` in your browser
2. **Content Types Available**:
   - Projects: Showcase your development work
   - Publications: Academic and technical publications
   - Experience: Work history and achievements
   - Certifications: Professional credentials
   - Skills: Technical proficiencies
   - Contact Messages: Form submissions

### Styling Customization
- **Colors**: Update `tailwind.config.js` for custom color schemes
- **Typography**: Modify font settings in `src/app/layout.tsx`
- **Components**: Customize UI components in `src/components/ui/`
- **Animations**: Adjust Framer Motion animations in component files

### Personal Information
Update personal details in:
- `src/app/layout.tsx` - SEO metadata and structured data
- `src/components/sections/HeroSection.tsx` - Hero section content
- `.env.local` - Site configuration

## 🏗️ Project Structure

```
portfolio/
├── public/                 # Static assets
├── sanity/                 # Sanity CMS schemas
│   └── schemas/           # Content type definitions
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (pages)/       # Route groups
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── layout/        # Layout components
│   │   ├── providers/     # Context providers
│   │   ├── sections/      # Page sections
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utility functions
│   └── sanity/            # Sanity configuration
├── .env.example           # Environment variables template
├── docker-compose.yml     # Docker configuration
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── sanity.config.ts       # Sanity Studio configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Configuration

### Next.js Configuration
The `next.config.js` includes:
- Standalone output for Docker deployment
- Image optimization for Sanity CDN
- Security headers
- Environment variable exposure

### Sanity Configuration
- **Studio Path**: `/studio`
- **Schema Types**: Defined in `sanity/schemas/`
- **API Version**: 2023-12-01
- **Vision Plugin**: Enabled for GROQ queries

### Tailwind Configuration
- **Typography Plugin**: For rich text content
- **Custom Colors**: Defined for brand consistency
- **Dark Mode**: Class-based theme switching

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment
1. Build the Docker image:
   ```bash
   docker build -t portfolio .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env.local portfolio
   ```

### Environment Variables for Production
Ensure all required environment variables are set:
- Sanity configuration
- Site URLs (update to production domain)
- Email service credentials
- Analytics tracking IDs

## 🔍 SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD for person and website
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions
- **Open Graph**: Social media sharing optimization
- **Performance**: Optimized Core Web Vitals

## ♿ Accessibility

- **WCAG 2.1 AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: Sufficient contrast ratios
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🧪 Testing

### Lighthouse Scores
The portfolio is optimized for:
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Theme switching functionality
- Form submissions
- Content loading from Sanity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Vaibhav Suman**
- GitHub: [@vsuman00](https://github.com/vsuman00)
- LinkedIn: [vaibhav-suman](https://linkedin.com/in/vaibhav-suman)
- Email: vaibhavsuman5@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Sanity](https://www.sanity.io/) - Content management system
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Lucide](https://lucide.dev/) - Icon library

## 📊 Project Status

- ✅ Core functionality implemented
- ✅ Responsive design completed
- ✅ CMS integration working
- ✅ SEO optimization done
- ✅ Accessibility compliance achieved
- ✅ Docker deployment ready
- 🔄 Continuous improvements and updates

---

**Built with ❤️ using Next.js and Sanity CMS**