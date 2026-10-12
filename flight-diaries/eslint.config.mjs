import js from '@eslint/js'
import globals from 'globals'
import {defineConfig, globalIgnores} from 'eslint/config'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

// export default tseslint.config(
//     {
//         files: ['**/*.ts'],
//         extends: [
//             eslint.configs.recommended,
//             ...tseslint.configs.recommendedTypeChecked,
//         ],
//         languageOptions: {
//             parserOptions: {
//                 projectService: true,
//                 tsconfigRootDir: import.meta.dirname,
//             },
//         },
//         plugins: {
//             '@stylistic': stylistic
//         },
//         rules: {
//             "@typescript-eslint/consistent-type-imports": "error",
//             '@stylistic/semi': 'error',
//             '@typescript-eslint/no-unsafe-assignment': 'error',
//             '@typescript-eslint/no-explicit-any': 'error',
//             '@typescript-eslint/explicit-function-return-type': 'off',
//             '@typescript-eslint/explicit-module-boundary-types': 'off',
//             '@typescript-eslint/restrict-template-expressions': 'off',
//             '@typescript-eslint/restrict-plus-operands': 'off',
//             '@typescript-eslint/no-unused-vars': [
//             'error',
//             { argsIgnorePattern: '^_' },
//             ],
//         }
//     }
// )

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
       stylistic.configs.customize({
      indent: 2,
      quotes: 'single',
      semi: false,
      jsx:true,
      commaDangle: 'always-multiline'
    })
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
])