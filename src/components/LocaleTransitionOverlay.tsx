import type { Locale } from '../i18n'
import {
  UtopiaWordmarkLoader,
  type UtopiaWordmarkLoaderPhase,
} from '../../packages/design-system/src/UtopiaWordmarkLoader'

type LocaleTransitionOverlayProps = {
  nextLocale: Locale
  onExitComplete: () => void
  onIntroComplete: () => void
  phase: UtopiaWordmarkLoaderPhase
}

const localeLoadingLabels: Record<Locale, string> = {
  ar: 'جار تحديث لغة الواجهة',
  en: 'Updating interface language',
  ko: '인터페이스 언어 업데이트 중',
}

export function LocaleTransitionOverlay({ nextLocale, onExitComplete, onIntroComplete, phase }: LocaleTransitionOverlayProps) {
  return (
    <UtopiaWordmarkLoader
      dir={nextLocale === 'ar' ? 'rtl' : 'ltr'}
      lang={nextLocale}
      label={localeLoadingLabels[nextLocale]}
      onExitComplete={onExitComplete}
      onIntroComplete={onIntroComplete}
      phase={phase}
      size="md"
    />
  )
}
