import request from "supertest";
import app from "../../app.js";

describe("get testimonials", () => {
  it("should return list of testimonials", async () => {
    const response = await request(app).get("/api/testimonials");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
