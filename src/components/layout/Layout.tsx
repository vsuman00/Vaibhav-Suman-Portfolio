'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${inter.className}`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}