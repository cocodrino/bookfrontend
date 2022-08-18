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
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  verbose: true,
  setupFilesAfterEnv: ["./setupTest.ts"],
};
