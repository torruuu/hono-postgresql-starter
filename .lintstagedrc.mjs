export default {
  '**/*.{js,ts}': 'eslint --fix',
  '**/*.ts': () => 'tsc --noEmit',
  '**/*.json': 'prettier --write',
}
