import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import hooks from 'eslint-plugin-react-hooks'
import refresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/components/ui/GooeyNav/*.jsx', 'src/components/ui/SpotlightCard/*.jsx', 'src/components/ui/BorderGlow/*.jsx', 'src/components/ui/Antigravity/*.jsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': hooks, 'react-refresh': refresh },
    rules: {
      ...hooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
)
