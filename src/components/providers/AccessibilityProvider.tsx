'use client'

import { useEffect } from 'react'
import { initializeAccessibility } from '@/lib/accessibility'

export default function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize accessibility features on client side
    initializeAccessibility()
  }, [])

  return <>{children}</>
}