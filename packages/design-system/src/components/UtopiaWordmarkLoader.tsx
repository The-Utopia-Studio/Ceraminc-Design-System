import * as React from 'react'
import { cn } from '../lib/utils'

export type UtopiaWordmarkLoaderPhase = 'intro' | 'exit'
export type UtopiaWordmarkLoaderSize = 'sm' | 'md' | 'lg'

export interface UtopiaWordmarkLoaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  fullscreen?: boolean
  label: string
  onExitComplete?: () => void
  onIntroComplete?: () => void
  phase?: UtopiaWordmarkLoaderPhase
  size?: UtopiaWordmarkLoaderSize
}

/**
 * The Utopia Studio wordmark loader for page and workspace transitions.
 * The loading loop runs only while the component remains mounted; consumers
 * own the actual loading state and switch to the exit phase when work is done.
 */
export function UtopiaWordmarkLoader({
  className,
  fullscreen = true,
  label,
  onExitComplete,
  onIntroComplete,
  phase = 'intro',
  size = 'sm',
  ...props
}: UtopiaWordmarkLoaderProps) {
  const handleAnimationEnd = (event: React.AnimationEvent<SVGSVGElement>) => {
    if (event.target !== event.currentTarget) return
    if (phase === 'intro') onIntroComplete?.()
    if (phase === 'exit') onExitComplete?.()
  }

  return (
    <div
      aria-busy={phase !== 'exit'}
      aria-live="polite"
      className={cn('uds-utopia-wordmark-loader', className)}
      data-fullscreen={fullscreen ? 'true' : 'false'}
      data-phase={phase}
      data-size={size}
      role="status"
      {...props}
    >
      <svg
        aria-hidden="true"
        className="uds-utopia-wordmark-loader-mark"
        focusable="false"
        onAnimationEnd={handleAnimationEnd}
        viewBox="0 0 364.9 236.9"
      >
        <g className="uds-utopia-wordmark-loader-line" data-line="the">
          <path d="M0,0v8.3h25.7v59.4h9.2V8.3h25.7V0H0z M114.8,0v28.9H80.4V0h-9.2v67.8h9.2V37.2h34.5v30.6h9.2V0H114.8z M142.2,0v67.8h50.2v-8.3h-41V37.2h32.2v-8.3h-32.2V8.3h41V0H142.2z" />
        </g>

        <g className="uds-utopia-wordmark-loader-line" data-line="utopia">
          <path d="M3,124.3V83.9h9.2v40.5c0,13.3,7.5,20,19.5,20c11.9,0,19.4-6.7,19.4-20V83.9h9.2v40.4c0,18.2-11.2,28.8-28.6,28.8C14.2,153.2,3,142.5,3,124.3" />
          <polygon points="129.4,92.3 103.6,92.3 103.6,151.9 94.4,151.9 94.4,92.3 68.7,92.3 68.7,83.9 129.4,83.9" />
          <path d="M132,118.1c0-20.8,13.4-35.3,32.5-35.3s32.6,14.6,32.6,35.3s-13.5,35.2-32.6,35.2S132,138.9,132,118.1 M164.5,144.8c14.4,0,23-10.5,23-26.7s-8.6-26.9-23-26.9s-23,10.7-23,26.9S150.1,144.8,164.5,144.8" />
          <path d="M208.7,83.9h25.7c14.7,0,24,7.9,24,20.4s-9.3,20.5-24,20.5h-16.5v27.1h-9.2V83.9z M234.1,116.6c9,0,15-4.7,15-12.2c0-7.6-5.8-12.2-15-12.2h-16.2v24.5h16.2V116.6z" />
          <rect height="68" width="9.2" x="269.2" y="83.9" />
          <path d="M313.5,83.9l-25,68h9.2l6.4-18h27.2l6.2,18h9.9l-24.6-68C322.8,83.9,313.5,83.9,313.5,83.9z M318,95.7h0.2l10.4,30.2h-21.5L318,95.7z" />
        </g>

        <g className="uds-utopia-wordmark-loader-line" data-line="studio">
          <path d="M309.4,201.8c0-16.2,8.6-26.8,22.9-26.8s22.9,10.6,22.9,26.8s-8.6,26.6-22.9,26.6S309.4,218,309.4,201.8 M332.4,236.9c19.1,0,32.5-14.3,32.5-35.1s-13.5-35.2-32.5-35.2c-19.1,0-32.4,14.5-32.4,35.2S313.3,236.9,332.4,236.9 M276.9,235.6h9.2v-67.8h-9.2V235.6z M214.9,227.5V176h14.3c16.4,0,24.2,11.2,24.2,25.9c0,14.6-7.9,25.7-24.2,25.7L214.9,227.5L214.9,227.5z M229.9,167.9h-24.1v67.8h24.1c19.9,0,33.1-13.7,33.1-33.8C263,181.7,249.7,167.9,229.9,167.9 M159.9,236.9c17.4,0,28.6-10.7,28.6-28.8v-40.3h-9.2v40.4c0,13.3-7.5,19.9-19.4,19.9c-12,0-19.5-6.7-19.5-19.9v-40.4h-9.2v40.3C131.2,226.2,142.3,236.9,159.9,236.9 M121.4,167.9H60.9v8.3h25.7v59.4h9.2v-59.4h25.7L121.4,167.9L121.4,167.9z M28.8,166.6c-14,0-23.7,7.6-23.7,19.4c0,8,4.6,14.4,16,17.4l14.3,3.9c7.5,2,10.7,4.9,10.7,10.3c0,7-6.6,11.4-16.5,11.4c-10.4,0-17.1-4.8-18.4-15.1H1.9c1.4,15.2,12.5,23,27.3,23c15.1,0,25.9-8.2,25.9-20.3c0-9-5.1-14.8-16.6-17.9L24.7,195c-7.5-2-10.6-4.7-10.6-10.1c0-5.9,5.2-10.4,14.2-10.4c8.6,0,14.5,3.9,15.8,12.6h9.2C52.1,174.2,42.9,166.6,28.8,166.6" />
        </g>
      </svg>
      <span className="uds-visually-hidden">{label}</span>
    </div>
  )
}
