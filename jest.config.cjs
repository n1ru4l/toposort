module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  resolver: "bob-the-bundler/jest-resolver.cjs",
  testMatch: ["**/*.spec.ts", "!**/dist/**"],
};
