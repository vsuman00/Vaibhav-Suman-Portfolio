"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  Clock,
  Globe,
  MessageSquare,
  User,
  Building,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactClient() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const projectTypes = [
    "Web Development",
    "Mobile App Development",
    "AI/ML Integration",
    "Consulting",
    "Code Review",
    "Technical Writing",
    "Other",
  ];

  const budgetRanges = [
    "Under ₹15,000",
    "₹15,000 - ₹30,000",
    "₹30,000 - ₹50,000",
    "₹50,000+",
    "Hourly Rate",
    "To be discussed",
  ];

  const timelineOptions = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3+ months",
    "Flexible",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
          projectType: "",
          budget: "",
          timeline: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "vaibhavsuman5@gmail.com",
      href: "mailto:vaibhavsuman5@gmail.com",
      description: "Best for project inquiries",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 72608 44610",
      href: "tel:+917260844610",
      description: "Available Mon-Sat, 9AM-10PM IST",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bangalore, India",
      href: "#",
      description: "Open to remote work worldwide",
    },
    {
      icon: Calendar,
      label: "Schedule a Call",
      value: "Book a meeting",
      href: "https://calendly.com/vaibhavsuman",
      description: "30-min consultation calls",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/vsuman00",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/vaibhav-suman",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/vaibhavsuman00",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
          role="banner"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            id="contact-heading"
          >
            Let&apos;s Work
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Together
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how
            we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <section
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
              role="form"
              aria-labelledby="contact-form-heading"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <MessageSquare
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    id="contact-form-heading"
                  >
                    Send me a message
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    I&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
                  role="status"
                  aria-live="polite"
                  aria-label="Success message"
                >
                  <CheckCircle
                    className="w-5 h-5 text-green-600 dark:text-green-400"
                    aria-hidden="true"
                  />
                  <p className="text-green-800 dark:text-green-200">
                    Thank you! Your message has been sent successfully. I&apos;ll get
                    back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
                  role="alert"
                  aria-live="assertive"
                  aria-label="Error message"
                >
                  <AlertCircle
                    className="w-5 h-5 text-red-600 dark:text-red-400"
                    aria-hidden="true"
                  />
                  <p className="text-red-800 dark:text-red-200">
                    Sorry, there was an error sending your message. Please try
                    again or contact me directly.
                  </p>
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-describedby="form-description"
              >
                <p id="form-description" className="sr-only">
                  Contact form with required fields marked with asterisk. All
                  form errors will be announced.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.name
                            ? "border-red-300 dark:border-red-600"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                        placeholder="Your full name"
                        required
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                    </div>
                    {errors.name && (
                      <p
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                        id="name-error"
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.email
                            ? "border-red-300 dark:border-red-600"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                        placeholder="your.email@example.com"
                        required
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                        id="email-error"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Company/Organization
                    </label>
                    <div className="relative">
                      <Building
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        placeholder="Your company name"
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Project Type
                    </label>
                    <div className="relative">
                      <Briefcase
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        aria-label="Select the type of project you need help with"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      aria-label="Select your project budget range"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Timeline
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        aria-label="Select your preferred project timeline"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.subject
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                    placeholder="Brief description of your project"
                    required
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  />
                  {errors.subject && (
                    <p
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                      id="subject-error"
                      role="alert"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                      errors.message
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                    placeholder="Tell me more about your project, goals, and any specific requirements..."
                    required
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "message-error" : "message-help"
                    }
                  />
                  <p
                    id="message-help"
                    className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Please provide as much detail as possible to help me
                    understand your needs.
                  </p>
                  {errors.message && (
                    <p
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                      id="message-error"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-describedby="submit-help"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        role="status"
                        aria-label="Sending message"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
                <p id="submit-help" className="sr-only">
                  Submit the contact form to send your message
                </p>
              </form>
            </section>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <section
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6"
              aria-labelledby="contact-methods"
            >
              <h3
                id="contact-methods"
                className="text-xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Get in Touch
              </h3>
              <div className="space-y-4" role="list">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      role="listitem"
                    >
                      <Link
                        href={item.href}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 focus:bg-gray-50 dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors group"
                        aria-label={`Contact via ${item.label}: ${item.value}`}
                      >
                        <div
                          className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors"
                          role="img"
                          aria-hidden="true"
                        >
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-blue-600 dark:text-blue-400 group-hover:underline">
                            {item.value}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Social Links */}
            <section
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6"
              aria-labelledby="social-links"
            >
              <h3
                id="social-links"
                className="text-xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Connect with Me
              </h3>
              <div className="flex gap-4" role="list">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-100 dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${social.color}`}
                      aria-label={`Connect on ${social.label}`}
                      role="listitem"
                    >
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Availability */}
            <section
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white"
              aria-labelledby="availability-status"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 bg-white rounded-full animate-pulse"
                  role="status"
                  aria-label="Available indicator"
                />
                <h3 id="availability-status" className="text-lg font-bold">
                  Currently Available
                </h3>
              </div>
              <p className="text-green-100 mb-4">
                I&apos;m currently accepting new projects and collaborations. Let&apos;s
                discuss your ideas!
              </p>
              <div className="flex items-center gap-2 text-sm text-green-100">
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>Remote work worldwide</span>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
