jest.mock("../config/db.js", () => ({
  authenticate: jest.fn(),
}));

describe("Test de conexión a la base de datos (test-db.js)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test("debe mostrar mensaje de éxito si la conexión es exitosa", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockAuth = jest.fn().mockResolvedValue();
    jest.doMock("../config/db.js", () => ({
      __esModule: true,
      default: { authenticate: mockAuth },
    }));

    await jest.isolateModulesAsync(async () => {
      await import("../test-db.js");
    });

    expect(mockAuth).toHaveBeenCalled();

    const llamada = logSpy.mock.calls[0][0];
    expect(llamada).toMatch(/Conexión con la base de datos establecida correctamente/);

    logSpy.mockRestore();
  });

  test("debe mostrar mensaje de error si la conexión falla", async () => {
    const error = new Error("Error de conexión");
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const mockAuth = jest.fn().mockRejectedValue(error);
    jest.doMock("../config/db.js", () => ({
      __esModule: true,
      default: { authenticate: mockAuth },
    }));

    await jest.isolateModulesAsync(async () => {
      await import("../test-db.js");
    });

    expect(mockAuth).toHaveBeenCalled();

    const llamada = errorSpy.mock.calls[0][0];
    expect(llamada).toMatch(/No se pudo conectar a la base de datos/);

    errorSpy.mockRestore();
  });
});
