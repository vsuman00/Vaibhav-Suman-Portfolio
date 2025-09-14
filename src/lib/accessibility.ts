/**
 * Accessibility utilities and helpers for better a11y support
 */

// ARIA live region announcer for screen readers
export class LiveRegionAnnouncer {
  private static instance: LiveRegionAnnouncer
  private liveRegion: HTMLElement | null = null

  private constructor() {
    if (typeof window !== 'undefined') {
      this.createLiveRegion()
    }
  }

  static getInstance(): LiveRegionAnnouncer {
    if (!LiveRegionAnnouncer.instance) {
      LiveRegionAnnouncer.instance = new LiveRegionAnnouncer()
    }
    return LiveRegionAnnouncer.instance
  }

  private createLiveRegion() {
    this.liveRegion = document.createElement('div')
    this.liveRegion.setAttribute('aria-live', 'polite')
    this.liveRegion.setAttribute('aria-atomic', 'true')
    this.liveRegion.setAttribute('class', 'sr-only')
    this.liveRegion.style.position = 'absolute'
    this.liveRegion.style.left = '-10000px'
    this.liveRegion.style.width = '1px'
    this.liveRegion.style.height = '1px'
    this.liveRegion.style.overflow = 'hidden'
    document.body.appendChild(this.liveRegion)
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.liveRegion) return
    
    this.liveRegion.setAttribute('aria-live', priority)
    this.liveRegion.textContent = message
    
    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = ''
      }
    }, 1000)
  }
}

// Focus management utilities
export class FocusManager {
  private static focusStack: HTMLElement[] = []

  static saveFocus() {
    const activeElement = document.activeElement as HTMLElement
    if (activeElement && activeElement !== document.body) {
      this.focusStack.push(activeElement)
    }
  }

  static restoreFocus() {
    const lastFocused = this.focusStack.pop()
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus()
    }
  }

  static trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    
    // Focus first element
    if (firstElement) {
      firstElement.focus()
    }

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }
}

// Keyboard navigation helpers
export const KeyboardNavigation = {
  // Handle arrow key navigation for lists
  handleArrowKeys: (e: KeyboardEvent, items: HTMLElement[], currentIndex: number) => {
    let newIndex = currentIndex
    
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % items.length
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
        break
      case 'Home':
        newIndex = 0
        break
      case 'End':
        newIndex = items.length - 1
        break
      default:
        return currentIndex
    }
    
    e.preventDefault()
    items[newIndex]?.focus()
    return newIndex
  },

  // Handle escape key
  handleEscape: (callback: () => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }
}

// ARIA helpers
export const AriaHelpers = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string = 'aria') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  },

  // Create describedby relationship
  createDescribedBy: (element: HTMLElement, descriptionId: string) => {
    const existingDescribedBy = element.getAttribute('aria-describedby')
    const newDescribedBy = existingDescribedBy 
      ? `${existingDescribedBy} ${descriptionId}`
      : descriptionId
    element.setAttribute('aria-describedby', newDescribedBy)
  },

  // Create labelledby relationship
  createLabelledBy: (element: HTMLElement, labelId: string) => {
    const existingLabelledBy = element.getAttribute('aria-labelledby')
    const newLabelledBy = existingLabelledBy 
      ? `${existingLabelledBy} ${labelId}`
      : labelId
    element.setAttribute('aria-labelledby', newLabelledBy)
  },

  // Set expanded state
  setExpanded: (element: HTMLElement, expanded: boolean) => {
    element.setAttribute('aria-expanded', expanded.toString())
  },

  // Set selected state
  setSelected: (element: HTMLElement, selected: boolean) => {
    element.setAttribute('aria-selected', selected.toString())
  },

  // Set pressed state for toggle buttons
  setPressed: (element: HTMLElement, pressed: boolean) => {
    element.setAttribute('aria-pressed', pressed.toString())
  }
}

// Color contrast utilities
export const ColorContrast = {
  // Check if color meets WCAG contrast requirements
  meetsContrastRequirement: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA') => {
    const ratio = ColorContrast.getContrastRatio(foreground, background)
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7
  },

  // Calculate contrast ratio between two colors
  getContrastRatio: (color1: string, color2: string) => {
    const lum1 = ColorContrast.getLuminance(color1)
    const lum2 = ColorContrast.getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
  },

  // Get relative luminance of a color
  getLuminance: (color: string) => {
    const rgb = ColorContrast.hexToRgb(color)
    if (!rgb) return 0
    
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  },

  // Convert hex to RGB
  hexToRgb: (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }
}

// Reduced motion detection
export const MotionPreferences = {
  prefersReducedMotion: () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  // Get safe animation duration based on user preferences
  getSafeAnimationDuration: (normalDuration: number) => {
    return MotionPreferences.prefersReducedMotion() ? 0 : normalDuration
  }
}

// Screen reader utilities
export const ScreenReader = {
  // Hide content from screen readers
  hideFromScreenReader: (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true')
  },

  // Show content to screen readers
  showToScreenReader: (element: HTMLElement) => {
    element.removeAttribute('aria-hidden')
  },

  // Make content visible only to screen readers
  makeScreenReaderOnly: (element: HTMLElement) => {
    element.classList.add('sr-only')
  }
}

// Initialize accessibility features
export const initializeAccessibility = () => {
  // Initialize live region announcer
  LiveRegionAnnouncer.getInstance()
  
  // Add skip link if not present
  if (typeof window !== 'undefined' && !document.querySelector('#skip-link')) {
    const skipLink = document.createElement('a')
    skipLink.id = 'skip-link'
    skipLink.href = '#main-content'
    skipLink.textContent = 'Skip to main content'
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md'
    document.body.insertBefore(skipLink, document.body.firstChild)
  }
}

// Export singleton instance
export const announcer = LiveRegionAnnouncer.getInstance()

// Convenience function for announcing to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  announcer.announce(message, priority)
}

// Convenience function for trapping focus
export const trapFocus = (container: HTMLElement) => {
  return FocusManager.trapFocus(container)
}

// Convenience function for managing focus
export const manageFocus = {
  save: () => FocusManager.saveFocus(),
  restore: () => FocusManager.restoreFocus()
}