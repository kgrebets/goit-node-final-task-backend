import request from "supertest";
import app from "../../app.js";

describe("ingredients list", () => {
  it("should return list of ingredients with default pagination", async () => {
    const res = await request(app).get("/api/ingredients");

    expect(res.status).toBe(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        page: 1,
        totalPages: expect.any(Number),
        results: expect.any(Array),
      })
    );
  });

  it("should support pagination query params", async () => {
    const res = await request(app)
      .get("/api/ingredients")
      .query({ page: 2, limit: 5 });

    expect(res.status).toBe(200);
    expect(res.body.page).toBe(2);
    expect(res.body.results.length).toBeLessThanOrEqual(5);
  });

  it("should filter ingredients by name", async () => {
    const res = await request(app)
      .get("/api/ingredients")
      .query({ name: "tom" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);

    if (res.body.results.length > 0) {
      expect(res.body.results[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          img: expect.any(String),
        })
      );
    }
  });

  it("should return 400 for invalid query params", async () => {
    const res = await request(app)
      .get("/api/ingredients")
      .query({ page: 0, limit: -5 });

    expect(res.status).toBe(400);
  });
});
