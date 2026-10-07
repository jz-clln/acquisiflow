import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  outputDir: "./.results",
  workers: 1,
  use: { baseURL: "http://localhost:3101", browserName: "chromium" },
  webServer: {
    command: "npm run start -- --port 3101",
    cwd: "../../..",
    url: "http://localhost:3101",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
