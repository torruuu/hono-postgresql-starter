import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
}

const unusedVarsConfig = {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
}

export default [
  {
    ignores: ['dist/', 'node_modules/'],
  },
  // Configuraciones base (se aplican a todos los archivos)
  eslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
  // Configuración específica para JavaScript
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': [RULES.ERROR, unusedVarsConfig],
      'array-callback-return': [RULES.OFF, { checkForEach: true }],
      'no-return-assign': RULES.OFF,
      'no-undef': RULES.OFF,
    },
  },
  // Configuración específica para TypeScript
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['prisma.config.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [RULES.ERROR, unusedVarsConfig],
    },
  },
]
