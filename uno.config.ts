import { defineConfig, presetAttributify, presetWind3 } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind3()
    // ...custom presets
  ],
  transformers: [transformerDirectives()]
})
