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
    "src/repository/**/*.js",
    "src/routes/**/*.js",
    "src/config/**/*.js",
    "src/docs/**/*.js",
    "src/middlewares/**/*.js",
    "!src/tests/**", // Excluir tests de la cobertura
  ],
  coverageReporters: ["lcov", "text"],
  testMatch: [
    "**/src/**/*.test.js", // Busca pruebas en todo el directorio src
    "**/src/**/*.spec.js", // También puedes usar spec.js si lo prefieres
    "**/tests/**/*.test.js", // O si tienes una carpeta tests
    "**/tests/**/*.spec.js",
  ],
};
