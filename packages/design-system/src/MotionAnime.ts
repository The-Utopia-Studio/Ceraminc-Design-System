import { animate } from 'animejs'
import { motionStateToKeyframe, type MotionAdapter } from './components/Motion'

function toAnimeValues(from: Record<string, unknown>, to: Record<string, unknown>) {
  const values: Record<string, unknown> = {}
  for (const key of new Set([...Object.keys(from), ...Object.keys(to)])) values[key] = [from[key], to[key]]
  return values
}

export const animeMotionAdapter: MotionAdapter = {
  id: 'animejs',
  label: 'Anime.js',
  animate(element, from, to, timing) {
    const animation = animate(element, {
      ...toAnimeValues(motionStateToKeyframe(from), motionStateToKeyframe(to)),
      duration: timing.duration * 1000,
      ease: `cubicBezier(${timing.ease.join(',')})`,
    })
    return { cancel: () => animation.revert(), finished: animation.then(() => undefined) }
  },
}
