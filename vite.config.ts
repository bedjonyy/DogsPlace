/**
 * Vite configuration — development server and production build.
 *
 * @vitejs/plugin-react uses Babel for Fast Refresh (HMR).
 *
 * The `test` block configures Vitest to run in a jsdom environment so
 * React components can be mounted and queried without a real browser.
 * setupFiles points to src/test/setup.ts which:
 *   - Extends Jest matchers with @testing-library/jest-dom (toBeInTheDocument etc.)
 *   - Polyfills IntersectionObserver because jsdom does not implement it,
 *     but Framer Motion's whileInView feature requires it.
 *
 * Coverage thresholds are set to 80% across all metrics, matching the
 * project testing rules. Run `npm run test:coverage` to see the report.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // allows describe/it/expect without importing them
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
