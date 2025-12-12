import request from "supertest";
import app from "../../app.js";

describe("get areas", () => {
  it("should return list of areas", async () => {
    const response = await request(app).get("/api/areas");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
