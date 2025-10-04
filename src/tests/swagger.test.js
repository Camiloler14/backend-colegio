import request from "supertest";
import express from "express";
import { swaggerDocs } from "../docs/swagger.js";

describe("Swagger Docs", () => {
  let app;

  beforeAll(() => {
    app = express();
    swaggerDocs(app);
  });

  it("Debe responder con status 200 y contener HTML", async () => {
    const res = await request(app).get("/api/docs/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("<!DOCTYPE html>");
  });
});
