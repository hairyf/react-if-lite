import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: [
      'test/**/*.test.ts',
      'test/**/*.test.tsx',
    ],
    server: { deps: { inline: ['vitest-package-exports'] } },
    coverage: {
      provider: 'v8',
      enabled: true,
    },
  },
})
