import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
  { ignores: ['dist', 'dev-dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      "prettier": prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-console": "warn", 
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      eqeqeq: ["error", "smart"],
      "no-trailing-spaces": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          jsxSingleQuote: true,       
        },
      ],
    },
  },
)
