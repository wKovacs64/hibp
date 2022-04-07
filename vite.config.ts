// TODO: figure out why eslint cannot resolve 'vitest/config'
// eslint-disable-next-line import/no-unresolved
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
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
