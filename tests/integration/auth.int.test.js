import request from "supertest";
import app from "../../app.js";

describe("user registration", () => {
  it("should register a new user", async () => {
    const payload = {
      email: `test-${Date.now()}@example.com`,
      username: `user-${Date.now()}`,
      password: "pass123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      email: payload.email,
      username: payload.username,
    });
  });

  it("should return 400 for invalid payload", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "not-an-email",
    });

    expect(response.status).toBe(400);
  });
});

describe("user login", () => {
  const user = {
    email: `login-${Date.now()}@example.com`,
    username: `login-user-${Date.now()}`,
    password: "pass123",
  };

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send(user);
  });

  it("should login with valid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe(user.email);
  });

  it("should return 401 for invalid password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "wrongpass",
    });

    expect(response.status).toBe(401);
  });
});

describe("current user", () => {
  let token;
  const user = {
    email: `current-${Date.now()}@example.com`,
    username: `current-user-${Date.now()}`,
    password: "pass123",
  };

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send(user);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    token = loginResponse.body.token;
  });

  it("should return current user when authenticated", async () => {
    const response = await request(app)
      .get("/api/auth/current")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe(user.email);
  });

  it("should return 401 without token", async () => {
    const response = await request(app).get("/api/auth/current");

    expect(response.status).toBe(401);
  });
});

describe("user logout", () => {
  let token;
  const user = {
    email: `logout-${Date.now()}@example.com`,
    username: `logout-user-${Date.now()}`,
    password: "pass123",
  };

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send(user);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    token = loginResponse.body.token;
  });

  it("should logout authenticated user", async () => {
    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("should return 401 when logging out without token", async () => {
    const response = await request(app).post("/api/auth/logout");

    expect(response.status).toBe(401);
  });
});
