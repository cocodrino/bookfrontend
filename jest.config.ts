// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/database",
    "src/test",
    "src/types",
  ],
  reporters: ["default"],
  globals: { "ts-jest": { diagnostics: false } },
  transform: {},
};
