import { animate } from 'framer-motion'
import { motionStateToKeyframe, type MotionAdapter, type MotionState, type MotionTiming } from './components/Motion'

function toValues(state: MotionState) {
  return Object.fromEntries(Object.entries(motionStateToKeyframe(state)).filter(([, value]) => value !== undefined))
}

export const framerMotionAdapter: MotionAdapter = {
  id: 'framer-motion',
  label: 'Motion for React',
  animate(element, from, to, timing) {
    Object.assign(element.style, toValues(from))
    const controls = animate(element, toValues(to), { duration: timing.duration, ease: timing.ease })
    return { cancel: () => controls.stop(), finished: controls.then(() => undefined) }
  },
}

export function toFramerMotionState(state: MotionState) {
  const { blur, ...values } = state
  return { ...values, ...(blur !== undefined ? { filter: `blur(${blur}px)` } : {}) }
}

export function toFramerTransition(timing: MotionTiming) {
  return { duration: timing.duration, ease: timing.ease }
}
