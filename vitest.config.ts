import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./src/**/__tests__/*"],
    setupFiles: "./test/setup.ts",
    coverage: {
      exclude: [...(configDefaults.coverage.exclude ?? []), "**/types.ts"],
      include: ["**/src/**/*"],
      reporter: ["text", "lcov", "clover"],
    },
    clearMocks: true,
    environment: "node",
  },
});
