import request from "supertest";
import app from "../../app.js";

describe("User domain", () => {
  let tokenA;
  let tokenB;
  let userA;
  let userB;

  beforeAll(async () => {
    //register users
    userA = {
      email: `a-${Date.now()}@example.com`,
      username: `user-a-${Date.now()}`,
      password: "pass123",
    };

    userB = {
      email: `b-${Date.now()}@example.com`,
      username: `user-b-${Date.now()}`,
      password: "pass123",
    };

    await request(app).post("/api/auth/register").send(userA);
    await request(app).post("/api/auth/register").send(userB);

    //login users
    const loginA = await request(app)
      .post("/api/auth/login")
      .send({ email: userA.email, password: userA.password });

    const loginB = await request(app)
      .post("/api/auth/login")
      .send({ email: userB.email, password: userB.password });

    tokenA = loginA.body.token;
    tokenB = loginB.body.token;

    //fetch current users to get IDs
    const meA = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${tokenA}`);

    const meB = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${tokenB}`);

    userA.id = meA.body.id;
    userB.id = meB.body.id;
  });

  describe("get current user", () => {
    it("should return current user info", async () => {
      const res = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${tokenA}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: userA.id,
          name: userA.username,
          email: userA.email,
          recipesCount: expect.any(Number),
          favoritesCount: expect.any(Number),
          followersCount: expect.any(Number),
          followingCount: expect.any(Number),
        })
      );
    });
  });

  describe("follow / unfollow flow", () => {
    it("should follow another user", async () => {
      const res = await request(app)
        .post(`/api/users/${userB.id}/follow`)
        .set("Authorization", `Bearer ${tokenA}`);

      expect(res.status).toBe(201);
    });

    it("should return user A following list", async () => {
      const res = await request(app)
        .get("/api/users/following")
        .set("Authorization", `Bearer ${tokenA}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      const ids = res.body.map((u) => u.id);
      expect(ids).toContain(userB.id);
    });

    it("should return followers of user B", async () => {
      const res = await request(app)
        .get(`/api/users/${userB.id}/followers`)
        .set("Authorization", `Bearer ${tokenA}`);

      expect(res.status).toBe(200);

      const ids = res.body.map((u) => u.id);
      expect(ids).toContain(userA.id);
    });

    it("should unfollow user", async () => {
      const res = await request(app)
        .delete(`/api/users/${userB.id}/follow`)
        .set("Authorization", `Bearer ${tokenA}`);

      expect(res.status).toBe(200);
    });
  });

  describe("authorization checks", () => {
    it("should return 401 when accessing protected route without token", async () => {
      const res = await request(app).get("/api/users/me");
      expect(res.status).toBe(401);
    });

    it("should not allow following yourself", async () => {
      const res = await request(app)
        .post(`/api/users/${userA.id}/follow`)
        .set("Authorization", `Bearer ${tokenA}`);

      expect(res.status).toBe(400);
    });
  });
});
