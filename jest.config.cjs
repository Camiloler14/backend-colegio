module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/models/**/*.js",     // ajusta según tu estructura y extensiones
    "src/controllers/**/*.js",
    "src/services/**/*.js",
    "src/repository/**/*.js",
    "!src/tests/**",          // excluir tests de la cobertura
  ],
  coverageReporters: ["lcov", "text"],
};
