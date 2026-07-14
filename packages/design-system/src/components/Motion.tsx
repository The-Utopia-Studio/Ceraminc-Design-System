import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../lib/utils'

export type MotionPattern = 'press' | 'page' | 'expand' | 'reveal' | 'icon'

export type MotionTiming = {
  duration: number
  ease: [number, number, number, number]
}

export type MotionProfile = Record<MotionPattern, MotionTiming>

export const ceramicMotionProfile: MotionProfile = {
  press: { duration: 0.16, ease: [0.2, 0, 0, 1] },
  page: { duration: 0.2, ease: [0.2, 0, 0, 1] },
  expand: { duration: 0.32, ease: [0.2, 0, 0, 1] },
  reveal: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  icon: { duration: 0.64, ease: [0.16, 1, 0.3, 1] },
}

type MotionContextValue = {
  motion: boolean
  profile: MotionProfile
}

const MotionContext = React.createContext<MotionContextValue>({
  motion: true,
  profile: ceramicMotionProfile,
})

export type MotionProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean
  motion?: boolean
  profile?: Partial<MotionProfile>
}

export function MotionProvider({
  asChild = false,
  children,
  className,
  motion = true,
  profile,
  style,
  ...props
}: MotionProviderProps) {
  const parent = React.useContext(MotionContext)
  const reduceMotion = useReducedMotion()
  const resolvedMotion = parent.motion && motion && !reduceMotion
  const resolvedProfile = React.useMemo(
    () => ({ ...parent.profile, ...profile }),
    [parent.profile, profile],
  )
  const Comp = asChild ? Slot : 'div'
  const duration = (pattern: MotionPattern) => resolvedMotion ? `${resolvedProfile[pattern].duration * 1000}ms` : '0ms'
  const easing = (pattern: MotionPattern) => `cubic-bezier(${resolvedProfile[pattern].ease.join(', ')})`
  const motionStyle = {
    ...style,
    '--motion-duration-press': duration('press'),
    '--motion-duration-page': duration('page'),
    '--motion-duration-expand': duration('expand'),
    '--motion-duration-reveal': duration('reveal'),
    '--motion-duration-icon': duration('icon'),
    '--motion-ease-standard': easing('press'),
    '--motion-ease-emphasized': easing('reveal'),
    '--motion-ease-icon': easing('icon'),
  } as React.CSSProperties

  return (
    <MotionContext.Provider value={{ motion: resolvedMotion, profile: resolvedProfile }}>
      <Comp
        className={cn('uds-motion-provider', className)}
        data-motion={resolvedMotion ? 'on' : 'off'}
        style={motionStyle}
        {...props}
      >
        {children}
      </Comp>
    </MotionContext.Provider>
  )
}

export function useMotionPattern(pattern: MotionPattern, motion = true) {
  const context = React.useContext(MotionContext)
  const reduceMotion = useReducedMotion()
  const enabled = context.motion && motion && !reduceMotion
  const timing = context.profile[pattern]

  return {
    enabled,
    pattern,
    transition: enabled
      ? { duration: timing.duration, ease: timing.ease }
      : { duration: 0 },
  }
}

export type MotionIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  active?: boolean
  motion?: boolean
  pattern: 'bell' | 'download' | 'copy'
}

export function MotionIcon({ active = false, children, className, motion = true, pattern, ...props }: MotionIconProps) {
  const resolved = useMotionPattern('icon', motion)

  return (
    <span
      className={cn('uds-motion-icon', className)}
      data-active={active ? 'true' : undefined}
      data-motion={resolved.enabled ? 'on' : 'off'}
      data-pattern={pattern}
      {...props}
    >
      {children}
    </span>
  )
}
