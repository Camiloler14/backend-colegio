module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transforma .js y .jsx con Babel
  },
  testEnvironment: 'node', // Asegura que Jest use un entorno de Node.js
};
