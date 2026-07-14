import { motion } from 'framer-motion'
import type { Locale } from '../i18n'

export function LocaleTransitionOverlay({ nextLocale }: { nextLocale: Locale }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="locale-transition-overlay"
      dir="ltr"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      lang={nextLocale}
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
          dir="ltr"
          role="img"
        >
          <motion.img
            alt=""
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="locale-transition-wordmark"
            decoding="sync"
            draggable={false}
            exit={{ opacity: 0, scale: 0.985, y: -8 }}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            src="/brand/the-utopia-studio-wordmark.svg"
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
