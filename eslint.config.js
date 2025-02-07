import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
  { ignores: ['dist'] },
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
      "no-console": "warn", // Warn on console statements
      "no-unused-vars": "warn", // Warn on unused variables
      eqeqeq: ["error", "smart"], // Enforce strict equality (===) in JavaScript
      "no-trailing-spaces": "error", // Disallow trailing spaces at the end of lines
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
