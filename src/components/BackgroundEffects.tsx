import { motion } from 'framer-motion'

export function BackgroundEffects() {
  return (
    <>
      {/* Mesh Gradient */}
      <div className="bg-mesh" />
      
      {/* Pattern Overlay */}
      <div className="bg-pattern" />
      
      {/* Floating Orbs - Optimized for performance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary Orb - Top Left */}
        <motion.div 
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full"
          style={{ 
            top: '5%', 
            left: '-15%',
            background: 'radial-gradient(circle, hsla(25, 100%, 50%, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
        
        {/* Secondary Orb - Bottom Right */}
        <motion.div 
          className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full"
          style={{ 
            top: '60%', 
            right: '-10%',
            background: 'radial-gradient(circle, hsla(210, 100%, 50%, 0.06) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.12, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: 2
          }}
        />
        
        {/* Tertiary Orb - Bottom Left */}
        <motion.div 
          className="absolute w-44 sm:w-56 h-44 sm:h-56 rounded-full"
          style={{ 
            bottom: '10%', 
            left: '10%',
            background: 'radial-gradient(circle, hsla(25, 100%, 50%, 0.05) 0%, transparent 70%)',
            filter: 'blur(25px)'
          }}
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.06, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: 4
          }}
        />

        {/* Small Accent Orb - Top Right (Desktop only) */}
        <motion.div 
          className="hidden lg:block absolute w-40 h-40 rounded-full"
          style={{ 
            top: '20%', 
            right: '15%',
            background: 'radial-gradient(circle, hsla(25, 100%, 55%, 0.04) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: 1
          }}
        />

        {/* Small Accent Orb - Center Left (Desktop only) */}
        <motion.div 
          className="hidden lg:block absolute w-32 h-32 rounded-full"
          style={{ 
            top: '45%', 
            left: '5%',
            background: 'radial-gradient(circle, hsla(210, 100%, 55%, 0.04) 0%, transparent 70%)',
            filter: 'blur(15px)'
          }}
          animate={{ 
            y: [0, -12, 0],
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: 3
          }}
        />
      </div>
    </>
  )
}
