import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./src/**/*.test.{ts,tsx}'],
    setupFiles: './test/setup.ts',
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        '**/mocks/**',
        '**/types.ts',
        '**/index.ts',
        '**/*.config.ts',
        '**/*.js',
      ],
      reporter: ['text', 'lcov', 'clover'],
    },
    clearMocks: true,
    globals: true,
    environment: 'node',
  },
});
