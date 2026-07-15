import assert from 'node:assert/strict'

const {
  getMotionThemeProfile,
  motionProfileByThemeId,
  motionProfileRegistry,
  motionThemeProfiles,
} = await import('../packages/design-system/dist/Motion.mjs')

assert.deepEqual(Object.keys(motionThemeProfiles).sort(), ['ceremonial', 'precise', 'swift'])
assert.equal(getMotionThemeProfile('utopia-default').id, 'ceremonial')
assert.equal(getMotionThemeProfile('dextrum').id, 'swift')
assert.equal(getMotionThemeProfile('barrier-intelligence').id, 'precise')
assert.equal(getMotionThemeProfile('precise').id, 'precise')
assert.equal(getMotionThemeProfile('unknown-theme').id, 'ceremonial')
assert.equal(motionProfileByThemeId['barrier-intelligence'].id, 'precise')

for (const profile of motionProfileRegistry.profiles) {
  assert.deepEqual(Object.keys(profile.recipes).sort(), ['feedback', 'layout', 'page', 'surface'])
  assert.deepEqual(Object.keys(profile.timings).sort(), ['expand', 'icon', 'page', 'press', 'reveal'])
  for (const recipe of Object.values(profile.recipes)) {
    for (const phase of [recipe.enter, recipe.exit]) {
      assert.equal(phase.timing.ease.length, 4)
      assert.ok(phase.timing.duration >= 0)
    }
  }
}

console.log('Ceramic motion manifest and runtime contract tests passed.')
