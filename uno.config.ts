import { defineConfig, presetAttributify, presetWind3 } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind3(),
    presetIcons()
    // ...custom presets
  ],
  transformers: [transformerDirectives()],
  shortcuts: [['icons', 'inline-block w-1em h-1em align-middle text-current']]
})
