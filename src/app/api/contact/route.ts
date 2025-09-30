import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitContactMessage } from "@/lib/sanity";
import nodemailer from "nodemailer";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100, "Company name is too long").optional(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per 15 minutes

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Email configuration
const createTransporter = () => {
  // Check if we have email credentials configured
  if (
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS &&
    process.env.EMAIL_PASS !== "your_app_password_here"
  ) {
    // Gmail configuration
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Check for SendGrid configuration
  if (
    process.env.SENDGRID_API_KEY &&
    process.env.SENDGRID_API_KEY !== "your_sendgrid_api_key"
  ) {
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Check for custom SMTP configuration
  if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth:
        process.env.EMAIL_USER && process.env.EMAIL_PASS
          ? {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            }
          : undefined,
    });
  }

  // For development/testing without email service, return null to use mock implementation
  return null;
};

// Email sending function
async function sendEmail(
  data: z.infer<typeof contactSchema>
): Promise<boolean> {
  const transporter = createTransporter();

  if (!transporter) {
    // Mock implementation for development/testing
    console.log("📧 Email would be sent with the following data:");
    console.log("To: hello@yourname.com");
    console.log("From:", data.email);
    console.log("Subject: New Contact Form Submission -", data.subject);
    console.log("Message:");
    console.log(`
      Name: ${data.name}
      Email: ${data.email}
      Company: ${data.company || "Not provided"}
      Project Type: ${data.projectType || "Not specified"}
      Budget: ${data.budget || "Not specified"}
      Timeline: ${data.timeline || "Not specified"}
      
      Message:
      ${data.message}
    `);

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  try {
    const mailOptions = {
      from: `"${data.name}" <${data.email}>`,
      to: process.env.CONTACT_EMAIL || "hello@yourname.com",
      subject: `New Contact Form Submission - ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Project Details</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ""}
            ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
            ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ""}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p>This message was sent from your portfolio contact form on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${data.name}
        Email: ${data.email}
        ${data.company ? `Company: ${data.company}` : ""}
        Subject: ${data.subject}
        ${data.projectType ? `Project Type: ${data.projectType}` : ""}
        ${data.budget ? `Budget: ${data.budget}` : ""}
        ${data.timeline ? `Timeline: ${data.timeline}` : ""}
        
        Message:
        ${data.message}
        
        Sent on: ${new Date().toLocaleString()}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return false;
  }
}

// Auto-reply email function
async function sendAutoReply(email: string, name: string): Promise<boolean> {
  const transporter = createTransporter();

  if (!transporter) {
    // Mock implementation
    console.log("📧 Auto-reply would be sent to:", email);
    console.log(`
      Subject: Thank you for your message, ${name}!
      
      Hi ${name},
      
      Thank you for reaching out! I've received your message and will get back to you within 24 hours.
      
      In the meantime, feel free to check out my latest projects and blog posts on my website.
      
      Best regards,
      Vaibhav Suman
    `);
    return true;
  }

  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL || "hello@yourname.com",
      to: email,
      subject: `Thank you for your message, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for your message! I've received your inquiry and will get back to you within 24 hours.</p>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="${process.env.NEXT_PUBLIC_SITE_URL}/projects" style="color: #007bff;">latest projects</a></li>
            <li>Read my <a href="${process.env.NEXT_PUBLIC_SITE_URL}/publications" style="color: #007bff;">publications</a></li>
            <li>Connect with me on <a href="https://linkedin.com/in/vaibhav-suman" style="color: #007bff;">LinkedIn</a></li>
          </ul>
          
          <p>Best regards,<br>Vaibhav Suman</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `,
      text: `
        Hi ${name},
        
        Thank you for your message! I've received your inquiry and will get back to you within 24 hours.
        
        In the meantime, feel free to check out my latest projects and publications on my website.
        
        Best regards,
        Vaibhav Suman
        
        ---
        This is an automated response. Please do not reply to this email.
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Auto-reply sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to send auto-reply:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Apply rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Additional server-side validation
    const suspiciousPatterns = [
      /viagra|cialis|pharmacy/i,
      /bitcoin|cryptocurrency|investment/i,
      /urgent|act now|limited time/i,
      /<script|javascript:|onclick/i,
    ];

    const messageContent =
      `${validatedData.subject} ${validatedData.message}`.toLowerCase();
    const isSuspicious = suspiciousPatterns.some((pattern) =>
      pattern.test(messageContent)
    );

    if (isSuspicious) {
      console.log("🚨 Suspicious message detected:", validatedData.email);
      return NextResponse.json(
        { error: "Message flagged for review." },
        { status: 400 }
      );
    }

    // Send email notification
    let emailSent = false;
    try {
      emailSent = await sendEmail(validatedData);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      // Don't fail the entire request if email fails - continue with storing data
    }

    // Store in Sanity CMS
    try {
      await submitContactMessage({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        subject: validatedData.subject,
        message: validatedData.message,
        projectType: validatedData.projectType,
        budget: validatedData.budget,
        timeline: validatedData.timeline,
      });
      console.log("✅ Message stored in Sanity CMS");
    } catch (sanityError) {
      console.error("❌ Failed to store in Sanity:", sanityError);
      // Continue execution - don't fail the entire request if Sanity fails
    }

    // Send auto-reply (only if main email was sent successfully or if we're using mock)
    if (emailSent) {
      try {
        await sendAutoReply(validatedData.email, validatedData.name);
      } catch (autoReplyError) {
        console.error("❌ Auto-reply failed:", autoReplyError);
        // Don't fail the request if auto-reply fails
      }
    }

    // Log successful submission
    console.log("✅ Contact form submission successful:", {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      timestamp: new Date().toISOString(),
      ip,
    });

    return NextResponse.json(
      {
        message: emailSent
          ? "Message sent successfully! You should receive a confirmation email shortly."
          : "Message received successfully! Email notifications are currently disabled, but your message has been saved.",
        timestamp: new Date().toISOString(),
        emailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact form error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
