import { motion } from 'framer-motion'
import type { Locale } from '../i18n'
import { useMotionRecipe } from '../../packages/design-system/src/Motion'
import { toFramerMotionState, toFramerTransition } from '../../packages/design-system/src/MotionFramer'

export function LocaleTransitionOverlay({ nextLocale }: { nextLocale: Locale }) {
  const isArabic = nextLocale === 'ar'
  const surfaceMotion = useMotionRecipe('surface')
  return (
    <motion.div
      animate={{ opacity: surfaceMotion.enter.to.opacity }}
      className="locale-transition-overlay"
      dir={isArabic ? 'rtl' : 'ltr'}
      exit={{ opacity: surfaceMotion.exit.to.opacity }}
      initial={{ opacity: surfaceMotion.enter.from.opacity }}
      lang={nextLocale}
      transition={toFramerTransition(surfaceMotion.enter.timing)}
    >
      <motion.div
        animate={toFramerMotionState(surfaceMotion.enter.to)}
        className="locale-transition-card"
        exit={toFramerMotionState(surfaceMotion.exit.to)}
        initial={toFramerMotionState(surfaceMotion.enter.from)}
        transition={toFramerTransition(surfaceMotion.enter.timing)}
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
