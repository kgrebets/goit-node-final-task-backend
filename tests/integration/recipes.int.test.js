import request from "supertest";
import app from "../../app.js";

describe("recipes list", () => {
  it("should return recipes list", async () => {
    const response = await request(app).get("/api/recipes");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("results");
    expect(Array.isArray(response.body.results)).toBe(true);
  });

  it("should support query params", async () => {
    const response = await request(app)
      .get("/api/recipes")
      .query({ page: 1, limit: 5 });

    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
  });
});

describe("recipe details", () => {
  it("should return 404 for non-existing recipe", async () => {
    const response = await request(app).get(
      "/api/recipes/64c8d958249faKe54bae90bb0"
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Recipe not found");
  });
});
