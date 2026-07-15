import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../lib/utils'
import motionProfilesManifest from '../manifests/motion-profiles.json'

export type MotionPattern = 'press' | 'page' | 'expand' | 'reveal' | 'icon'
export type MotionRecipeName = 'feedback' | 'page' | 'surface' | 'layout'
export type MotionPhase = 'enter' | 'exit'
export type MotionEasing = [number, number, number, number]

export type MotionTiming = { duration: number; ease: MotionEasing }
export type MotionProfile = Record<MotionPattern, MotionTiming>
export type MotionState = {
  opacity?: number
  x?: number
  y?: number
  scale?: number
  rotate?: number
  blur?: number
}
export type MotionPhaseRecipe = { from: MotionState; to: MotionState; timing: MotionTiming }
export type MotionRecipe = { enter: MotionPhaseRecipe; exit: MotionPhaseRecipe }
export type MotionThemeProfile = {
  id: string
  label: string
  themes: string[]
  personality: 'ceremonial' | 'swift' | 'precise'
  description: string
  rules: string[]
  timings: MotionProfile
  recipes: Record<MotionRecipeName, MotionRecipe>
  orchestration: { delayChildren: number; stagger: number }
}
export type MotionPlaybackControls = { cancel: () => void; finished?: Promise<unknown> }
export type MotionAdapter = {
  id: string
  label: string
  animate: (element: HTMLElement, from: MotionState, to: MotionState, timing: MotionTiming) => MotionPlaybackControls
}

export type MotionProfileRegistry = {
  version: number
  contract: Record<string, string>
  adapters: Array<{ id: string; package: string; entry: string }>
  profiles: MotionThemeProfile[]
}

export const motionProfileRegistry = motionProfilesManifest as unknown as MotionProfileRegistry
export const motionThemeProfiles = Object.fromEntries(
  motionProfileRegistry.profiles.map((profile) => [profile.id, profile]),
) as Record<string, MotionThemeProfile>
export const ceramicMotionProfile = motionThemeProfiles.ceremonial.timings
export const motionProfileByThemeId = Object.fromEntries(
  motionProfileRegistry.profiles.flatMap((profile) => profile.themes.map((themeId) => [themeId, profile])),
) as Record<string, MotionThemeProfile>

export function getMotionThemeProfile(themeIdOrProfileId: string) {
  return motionThemeProfiles[themeIdOrProfileId] ?? motionProfileByThemeId[themeIdOrProfileId] ?? motionThemeProfiles.ceremonial
}

export function motionStateToKeyframe(state: MotionState): Keyframe {
  const transforms: string[] = []
  if (state.x !== undefined) transforms.push(`translateX(${state.x}px)`)
  if (state.y !== undefined) transforms.push(`translateY(${state.y}px)`)
  if (state.scale !== undefined) transforms.push(`scale(${state.scale})`)
  if (state.rotate !== undefined) transforms.push(`rotate(${state.rotate}deg)`)
  return {
    ...(state.opacity !== undefined ? { opacity: state.opacity } : {}),
    ...(transforms.length ? { transform: transforms.join(' ') } : {}),
    ...(state.blur !== undefined ? { filter: `blur(${state.blur}px)` } : {}),
  }
}

export function easingToCss(ease: MotionEasing) {
  return `cubic-bezier(${ease.join(', ')})`
}

export const waapiMotionAdapter: MotionAdapter = {
  id: 'waapi', label: 'CSS / Web Animations API',
  animate(element, from, to, timing) {
    if (typeof element.animate !== 'function') {
      Object.assign(element.style, motionStateToKeyframe(to))
      return { cancel: () => undefined, finished: Promise.resolve() }
    }
    const animation = element.animate([motionStateToKeyframe(from), motionStateToKeyframe(to)], {
      duration: timing.duration * 1000, easing: easingToCss(timing.ease), fill: 'both',
    })
    return { cancel: () => animation.cancel(), finished: animation.finished }
  },
}

type MotionContextValue = {
  adapter: MotionAdapter
  motion: boolean
  profile: MotionProfile
  reduceMotion: boolean
  themeProfile: MotionThemeProfile
}

const MotionContext = React.createContext<MotionContextValue>({
  adapter: waapiMotionAdapter, motion: true, profile: ceramicMotionProfile, reduceMotion: false,
  themeProfile: motionThemeProfiles.ceremonial,
})

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = React.useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return reduceMotion
}

export type MotionProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  adapter?: MotionAdapter
  asChild?: boolean
  motion?: boolean
  profile?: Partial<MotionProfile>
  themeProfile?: MotionThemeProfile
}

export function MotionProvider({
  adapter, asChild = false, children, className, motion = true, profile, style,
  themeProfile, ...props
}: MotionProviderProps) {
  const parent = React.useContext(MotionContext)
  const reduceMotion = usePrefersReducedMotion()
  const resolvedMotion = parent.motion && motion
  const resolvedThemeProfile = themeProfile ?? parent.themeProfile
  const resolvedProfile = React.useMemo(() => ({ ...resolvedThemeProfile.timings, ...profile }), [profile, resolvedThemeProfile])
  const resolvedAdapter = adapter ?? parent.adapter
  const Comp = asChild ? Slot : 'div'
  const duration = (pattern: MotionPattern) => resolvedMotion && !reduceMotion ? `${resolvedProfile[pattern].duration * 1000}ms` : '0ms'
  const easing = (pattern: MotionPattern) => easingToCss(resolvedProfile[pattern].ease)
  const motionStyle = {
    ...style,
    '--motion-duration-press': duration('press'), '--motion-duration-page': duration('page'),
    '--motion-duration-expand': duration('expand'), '--motion-duration-reveal': duration('reveal'),
    '--motion-duration-icon': duration('icon'), '--motion-ease-standard': easing('press'),
    '--motion-ease-emphasized': easing('reveal'), '--motion-ease-icon': easing('icon'),
  } as React.CSSProperties
  const contextValue = React.useMemo<MotionContextValue>(() => ({
    adapter: resolvedAdapter, motion: resolvedMotion, profile: resolvedProfile, reduceMotion,
    themeProfile: resolvedThemeProfile,
  }), [reduceMotion, resolvedAdapter, resolvedMotion, resolvedProfile, resolvedThemeProfile])

  return (
    <MotionContext.Provider value={contextValue}>
      <Comp className={cn('uds-motion-provider', className)} data-motion={resolvedMotion && !reduceMotion ? 'on' : 'off'}
        data-motion-engine={resolvedAdapter.id} data-motion-profile={resolvedThemeProfile.id} style={motionStyle} {...props}>
        {children}
      </Comp>
    </MotionContext.Provider>
  )
}

export function useMotionSystem() {
  return React.useContext(MotionContext)
}

export function useMotionPattern(pattern: MotionPattern, motion = true) {
  const context = React.useContext(MotionContext)
  const enabled = context.motion && motion && !context.reduceMotion
  const timing = context.profile[pattern]
  return { enabled, pattern, transition: enabled ? { duration: timing.duration, ease: timing.ease } : { duration: 0 } }
}

function reducedPhaseRecipe(recipe: MotionPhaseRecipe): MotionPhaseRecipe {
  const finalState: MotionState = {
    opacity: recipe.to.opacity ?? 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    blur: 0,
  }
  return {
    from: finalState,
    to: finalState,
    timing: { ...recipe.timing, duration: 0 },
  }
}

export function useMotionRecipe(name: MotionRecipeName) {
  const context = React.useContext(MotionContext)
  const recipe = context.themeProfile.recipes[name]
  return context.reduceMotion ? { enter: reducedPhaseRecipe(recipe.enter), exit: reducedPhaseRecipe(recipe.exit) } : recipe
}

export function useMotionAnimation<T extends HTMLElement>(name: MotionRecipeName, motion = true) {
  const context = React.useContext(MotionContext)
  const recipe = useMotionRecipe(name)
  const ref = React.useRef<T>(null)
  const controls = React.useRef<MotionPlaybackControls | null>(null)
  const animate = React.useCallback((phase: MotionPhase = 'enter') => {
    const element = ref.current
    if (!element || !context.motion || !motion) return undefined
    controls.current?.cancel()
    const phaseRecipe = recipe[phase]
    controls.current = context.adapter.animate(element, phaseRecipe.from, phaseRecipe.to, phaseRecipe.timing)
    return controls.current
  }, [context.adapter, context.motion, motion, recipe])
  React.useEffect(() => {
    if (!context.motion || !motion) {
      const element = ref.current
      if (element) Object.assign(element.style, motionStateToKeyframe(recipe.enter.to))
      return () => controls.current?.cancel()
    }
    animate('enter')
    return () => controls.current?.cancel()
  }, [animate, context.motion, motion, recipe.enter.to])
  return { animate, engine: context.adapter.id, recipe, ref }
}

export type MotionIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  active?: boolean
  motion?: boolean
  pattern: 'bell' | 'download' | 'copy'
}

export function MotionIcon({ active = false, children, className, motion = true, pattern, ...props }: MotionIconProps) {
  const resolved = useMotionPattern('icon', motion)
  return <span className={cn('uds-motion-icon', className)} data-active={active ? 'true' : undefined}
    data-motion={resolved.enabled ? 'on' : 'off'} data-pattern={pattern} {...props}>{children}</span>
}
