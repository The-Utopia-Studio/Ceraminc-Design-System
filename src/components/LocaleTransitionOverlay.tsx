import { motion } from 'framer-motion'
import type { Locale } from '../i18n'

export function LocaleTransitionOverlay({ nextLocale }: { nextLocale: Locale }) {
  const isArabic = nextLocale === 'ar'
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="locale-transition-overlay"
      dir={isArabic ? 'rtl' : 'ltr'}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      lang={nextLocale}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="locale-transition-card"
        exit={{ opacity: 0, scale: 0.98, y: -8 }}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <span aria-hidden="true" className="locale-transition-symbol">{isArabic ? 'ع' : 'A'}</span>
        <div className="locale-transition-copy">
          <strong>{isArabic ? 'العربية' : 'English'}</strong>
          <span>{isArabic ? 'تغيير اتجاه الواجهة' : 'Updating interface direction'}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
