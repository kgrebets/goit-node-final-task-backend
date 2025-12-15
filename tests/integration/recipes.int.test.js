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

describe("create recipe", () => {
  let token;
  let areaId;
  let ingredientId;

  beforeAll(async () => {
    const user = {
      email: `recipe-${Date.now()}@example.com`,
      username: `recipe-user-${Date.now()}`,
      password: "pass123",
    };

    await request(app).post("/api/auth/register").send(user);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    token = loginRes.body.token;

    //Get area
    const areasRes = await request(app).get("/api/areas");
    expect(areasRes.status).toBe(200);
    expect(Array.isArray(areasRes.body)).toBe(true);
    expect(areasRes.body.length).toBeGreaterThan(0);

    areaId = areasRes.body[0].id;

    // Get ingredient
    const ingredientsRes = await request(app)
      .get("/api/ingredients")
      .query({ limit: 1 });

    expect(ingredientsRes.status).toBe(200);
    expect(ingredientsRes.body.results.length).toBeGreaterThan(0);

    ingredientId = ingredientsRes.body.results[0].id;
  });

  it("should create recipe", async () => {
    const payload = {
      title: "Integration test recipe",
      categoryid: "6462a6cd4c3d0ddd28897f8d",
      areaid: areaId,
      instructions: "Mix everything and cook",
      description: "Recipe created in integration test",
      thumb:
        "https://ftp.goit.study/img/so-yummy/preview/Saltfish%20and%20Ackee.jpg",
      time: 45,
      ingredients: [
        {
          id: ingredientId,
          measure: "333 g",
        },
      ],
    };

    const res = await request(app)
      .post("/api/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: payload.title,
        categoryid: payload.categoryid,
        areaid: payload.areaid,
        userid: expect.any(String),
        time: payload.time,
        recipeIngredients: expect.any(Array),
      })
    );

    expect(res.body.recipeIngredients).toHaveLength(1);

    expect(res.body.recipeIngredients[0]).toEqual(
      expect.objectContaining({
        measure: "333 g",
        ingredient: expect.objectContaining({
          id: ingredientId,
          name: expect.any(String),
          img: expect.any(String),
          description: expect.any(String),
        }),
      })
    );
  });
});
