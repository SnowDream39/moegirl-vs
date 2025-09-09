import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [presetWind4()],
  shortcuts: [
    {
      h1: 'text-2xl font-bold mb-4',
      h2: 'text-xl font-bold mb-4',
    },
  ],
})
