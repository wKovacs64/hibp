import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./src/**/*.test.{ts,tsx}'],
    setupFiles: './test/setup.ts',
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        '**/mocks/**',
        '**/index.ts',
      ],
      reporter: ['text', 'lcov', 'clover'],
    },
    clearMocks: true,
    globals: true,
    environment: 'node',
  },
});
