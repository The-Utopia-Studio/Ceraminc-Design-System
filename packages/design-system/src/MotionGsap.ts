import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { motionStateToKeyframe, type MotionAdapter } from './components/Motion'

gsap.registerPlugin(CustomEase)

export const gsapMotionAdapter: MotionAdapter = {
  id: 'gsap',
  label: 'GSAP',
  animate(element, from, to, timing) {
    const tween = gsap.fromTo(element, motionStateToKeyframe(from), {
      ...motionStateToKeyframe(to),
      duration: timing.duration,
      ease: CustomEase.create('', timing.ease.join(',')),
    })
    return { cancel: () => tween.kill(), finished: Promise.resolve(tween.then(() => undefined)) }
  },
}
