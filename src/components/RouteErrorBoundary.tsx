import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '../../packages/design-system/src/Button'
import type { Locale } from '../i18n'

type RouteErrorBoundaryProps = {
  children: ReactNode
  locale: Locale
  resetKey: string
}

type RouteErrorBoundaryState = {
  error: Error | null
}

export class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route render failed', error, info.componentStack)
  }

  componentDidUpdate(previousProps: RouteErrorBoundaryProps) {
    if (this.state.error && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (!this.state.error) return this.props.children

    const isArabic = this.props.locale === 'ar'
    return (
      <section className="route-error" role="alert">
        <p className="eyebrow">{isArabic ? 'تعذر تحميل الصفحة' : 'Page load interrupted'}</p>
        <h1>{isArabic ? 'لم نتمكن من فتح هذه الصفحة.' : 'This page could not be opened.'}</h1>
        <p>
          {isArabic
            ? 'قد يكون ملف الصفحة قد تغيّر أثناء التصفح. أعد المحاولة أو ارجع إلى دليل البدء.'
            : 'The page module may have changed while you were browsing. Try again or return to Getting Started.'}
        </p>
        <div className="route-error-actions">
          <Button onClick={() => window.location.reload()}>
            {isArabic ? 'إعادة المحاولة' : 'Try again'}
          </Button>
          <Button asChild variant="outline">
            <a href="#/docs">{isArabic ? 'العودة إلى دليل البدء' : 'Back to Getting Started'}</a>
          </Button>
        </div>
      </section>
    )
  }
}
