module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/models/**/*.js",
    "src/controllers/**/*.js",
    "src/services/**/*.js",
    "src/repositories/**/*.js",
    "src/routes/**/*.js",
    "src/config/**/*.js",
    "src/docs/**/*.js",
    "src/middlewares/**/*.js",
    "!src/tests/**",
  ],
  coverageReporters: ["lcov", "text"],
  testMatch: [
    "**/src/**/*.test.js", 
    "**/src/**/*.spec.js", 
    "**/tests/**/*.test.js", 
    "**/tests/**/*.spec.js",
  ],
};
