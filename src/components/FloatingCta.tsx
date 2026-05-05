import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, X, ArrowRight } from 'lucide-react'
import { trackEvent } from '../App'

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    trackEvent('floating_cta_click', { action: 'open_form' })
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDismissed(true)
    trackEvent('floating_cta_dismiss')
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-4 sm:right-4 z-50 md:left-auto md:right-6 md:max-w-xs"
        >
          <motion.a
            href="https://forms.gle/e5GGQZqxGN2hMDnA6"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="group shine-effect flex items-center gap-2.5 sm:gap-3 w-full bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] text-white font-bold py-3 sm:py-4 px-4 sm:px-5 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 relative"
            style={{
              boxShadow: '0 10px 40px hsla(var(--color-primary), 0.5), 0 0 0 1px hsla(var(--color-primary), 0.2)',
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Pulse Ring */}
            <motion.span 
              className="absolute inset-0 rounded-xl sm:rounded-2xl" 
              style={{ background: 'hsla(var(--color-primary), 0.4)' }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Icon */}
            <motion.div 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>

            {/* Text */}
            <span className="flex-1 text-left min-w-0">
              <strong className="block text-xs sm:text-sm truncate">Garantir minha vaga</strong>
              <small className="text-[10px] sm:text-xs opacity-85 truncate block">Ultimas vagas disponiveis!</small>
            </span>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 hidden sm:block" />

            {/* Dismiss button */}
            <motion.button
              onClick={handleDismiss}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
              aria-label="Fechar"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.button>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
