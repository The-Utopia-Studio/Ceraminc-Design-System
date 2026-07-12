import { motion } from 'framer-motion'
import type { Locale } from '../i18n'

export function LocaleTransitionOverlay({ nextLocale }: { nextLocale: Locale | null }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="locale-transition-overlay"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="locale-transition-card"
        exit={{ opacity: 0, scale: 0.98, y: -8 }}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-label={nextLocale === 'ar' ? 'الانتقال إلى واجهة The Utopia Studio العربية' : 'Transition to The Utopia Studio English interface'}
          className="locale-transition-mark"
          role="img"
        >
          <motion.img alt="" animate={{ opacity: 1, x: 0 }} className="locale-transition-word locale-transition-word-the" initial={{ opacity: 0, x: -44 }} src="/projects/utopia-locale-loader/scene-1/word-the.png" transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }} />
          <motion.img alt="" animate={{ opacity: 1, x: 0 }} className="locale-transition-word locale-transition-word-utopia" initial={{ opacity: 0, x: 44 }} src="/projects/utopia-locale-loader/scene-1/word-utopia.png" transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
          <motion.img alt="" animate={{ opacity: 1, x: 0 }} className="locale-transition-word locale-transition-word-studio" initial={{ opacity: 0, x: -44 }} src="/projects/utopia-locale-loader/scene-1/word-studio.png" transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </motion.div>
    </motion.div>
  )
}
