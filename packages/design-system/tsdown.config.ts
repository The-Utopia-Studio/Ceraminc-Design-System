import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/Accordion.ts', 'src/Alert.ts', 'src/AlertDialog.ts', 'src/Attachment.ts',
    'src/Badge.ts', 'src/Button.ts', 'src/ButtonGroup.ts', 'src/Card.ts', 'src/Chat.ts',
    'src/DataDisplay.ts', 'src/Forms.ts', 'src/IconButton.ts', 'src/Layout.ts', 'src/Motion.ts',
    'src/MotionAnime.ts', 'src/MotionFramer.ts', 'src/MotionGsap.ts',
    'src/Navigation.ts', 'src/ShadcnPrimitives.ts', 'src/Sidebar.ts', 'src/Surface.ts',
    'src/ToggleButton.ts', 'src/ToggleButtonGroup.ts', 'src/Typography.ts', 'src/Utilities.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  deps: {
    neverBundle: ['react', 'react-dom', 'animejs', 'framer-motion', 'gsap'],
  },
})
