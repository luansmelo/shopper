import path from "path";
import globals from "globals";
import tseslint from "typescript-eslint";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{mjs,ts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'), 
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
      globals: globals.node, 
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    ignores: [
      'dist',
      'node_modules'  
    ]
  }
];
