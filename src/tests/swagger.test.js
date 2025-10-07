import { swaggerDocs } from "../docs/swagger.js"; 
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

jest.mock("swagger-jsdoc");
jest.mock("swagger-ui-express", () => ({
  serve: jest.fn(),
  setup: jest.fn(),
}));

describe("swaggerDocs", () => {
  it("debería configurar Swagger correctamente", () => {
    const app = { use: jest.fn() };
    swaggerJSDoc.mockReturnValue({ swagger: "doc" }); 

    swaggerDocs(app);

    expect(swaggerJSDoc).toHaveBeenCalledTimes(1);
    expect(app.use).toHaveBeenCalledWith(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup({ swagger: "doc" })
    );
  });
});
