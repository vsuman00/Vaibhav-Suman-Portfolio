import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100, 'Company name is too long').optional(),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional()
})

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 requests per 15 minutes

  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// Email sending function (mock implementation)
async function sendEmail(data: z.infer<typeof contactSchema>): Promise<boolean> {
  // In a real application, you would integrate with an email service like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP
  
  console.log('📧 Email would be sent with the following data:')
  console.log('To: hello@yourname.com')
  console.log('From:', data.email)
  console.log('Subject: New Contact Form Submission -', data.subject)
  console.log('Message:')
  console.log(`
    Name: ${data.name}
    Email: ${data.email}
    Company: ${data.company || 'Not provided'}
    Project Type: ${data.projectType || 'Not specified'}
    Budget: ${data.budget || 'Not specified'}
    Timeline: ${data.timeline || 'Not specified'}
    
    Message:
    ${data.message}
  `)
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return true to simulate successful email sending
  // In production, this would return the actual result from your email service
  return true
}

// Auto-reply email function
async function sendAutoReply(email: string, name: string): Promise<boolean> {
  console.log('📧 Auto-reply would be sent to:', email)
  console.log(`
    Subject: Thank you for your message, ${name}!
    
    Hi ${name},
    
    Thank you for reaching out! I've received your message and will get back to you within 24 hours.
    
    In the meantime, feel free to check out my latest projects and blog posts on my website.
    
    Best regards,
    Your Name
  `)
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Apply rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Additional server-side validation
    const suspiciousPatterns = [
      /viagra|cialis|pharmacy/i,
      /bitcoin|cryptocurrency|investment/i,
      /urgent|act now|limited time/i,
      /<script|javascript:|onclick/i
    ]

    const messageContent = `${validatedData.subject} ${validatedData.message}`.toLowerCase()
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(messageContent))

    if (isSuspicious) {
      console.log('🚨 Suspicious message detected:', validatedData.email)
      return NextResponse.json(
        { error: 'Message flagged for review.' },
        { status: 400 }
      )
    }

    // Send email notification
    const emailSent = await sendEmail(validatedData)
    
    if (!emailSent) {
      throw new Error('Failed to send email')
    }

    // Send auto-reply
    await sendAutoReply(validatedData.email, validatedData.name)

    // Log successful submission
    console.log('✅ Contact form submission successful:', {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      timestamp: new Date().toISOString(),
      ip
    })

    return NextResponse.json(
      { 
        message: 'Message sent successfully!',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Contact form error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}