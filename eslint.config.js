import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const autoImport = require('./.eslintrc-auto-import.json')

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...autoImport.globals }
    }
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  { ignores: ['.css', '*.d.ts'] },
  {
    rules: {
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  },
  prettierRecommended // 覆盖eslint的默认配置
])
