module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '*.cjs', 'vite.config.js'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react-refresh'],
  rules: {
    // This project intentionally colocates each Context Provider with its
    // companion hook (useAuth, useToast, useCartTotals). That's a deliberate
    // architecture choice, and the rule only affects dev-time hot-reload —
    // not correctness — so we disable it to keep `npm run lint` clean.
    'react-refresh/only-export-components': 'off',
    // Vite + the new JSX transform don't require React in scope.
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // Allow unescaped apostrophes in Indonesian copy ("Editor's Pick", etc.).
    'react/no-unescaped-entities': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
