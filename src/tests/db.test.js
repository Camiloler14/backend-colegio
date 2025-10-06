import { jest } from "@jest/globals";


jest.unstable_mockModule("sequelize", () => {
  const mockAuthenticate = jest.fn();
  const Sequelize = jest.fn().mockImplementation(() => ({
    authenticate: mockAuthenticate,
  }));
  return { Sequelize, __esModule: true };
});

describe("config/db.js", () => {
  let testConnection;
  let sequelizeModule;
  const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(async () => {
    jest.clearAllMocks();
    sequelizeModule = await import("../config/db.js");
    testConnection = sequelizeModule.testConnection;
  });

  afterAll(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test("✅ debe mostrar mensaje de éxito si la conexión es exitosa", async () => {
    sequelizeModule.default.authenticate = jest.fn().mockResolvedValue();

    await testConnection();

    expect(sequelizeModule.default.authenticate).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("Conexión a PostgreSQL exitosa");
  });

  test("debe mostrar mensaje de error si la conexión falla", async () => {
    const fakeError = new Error("Error de conexión");
    sequelizeModule.default.authenticate = jest.fn().mockRejectedValue(fakeError);

    await expect(testConnection()).rejects.toThrow("Error de conexión");

    expect(sequelizeModule.default.authenticate).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      "No se pudo conectar a PostgreSQL:",
      fakeError
    );
  });
});
