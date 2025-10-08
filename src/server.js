import app from './app.js';

const PORT = process.env.PORT || 3000;

// Escuchar en todas las interfaces (0.0.0.0) para exponer a Internet
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});

export default server;
