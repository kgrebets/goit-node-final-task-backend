import request from "supertest";
import app from "../../app.js";

describe("get categories", () => {
  it("should return list of categories", async () => {
    const response = await request(app).get("/api/categories");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
