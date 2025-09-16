import { jest } from '@jest/globals';
import { swaggerDocs } from '../docs/swagger.js';

describe('swaggerDocs', () => {
  it('debe montar swagger-ui en /api/docs y mostrar mensaje', () => {
    const useMock = jest.fn();
    const appMock = { use: useMock };

    // Espiar console.log para verificar mensaje
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    swaggerDocs(appMock);

    // Verificamos que app.use fue llamado con la ruta y funciones
    expect(useMock).toHaveBeenCalledTimes(1);
    expect(useMock.mock.calls[0][0]).toBe('/api/docs');

    // Segundo y tercer argumento deben ser funciones middleware
    expect(typeof useMock.mock.calls[0][1]).toBe('object');
    expect(typeof useMock.mock.calls[0][2]).toBe('function');

    // Verificamos que se imprimió el mensaje esperado
    expect(consoleSpy).toHaveBeenCalledWith(
      'Documentación Swagger disponible en http://localhost:3000/api/docs'
    );

    consoleSpy.mockRestore();
  });
});
