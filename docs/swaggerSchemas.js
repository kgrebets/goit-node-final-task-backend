/**
 * @swagger
 * components:
 *   schemas:
 *     PopularRecipe:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6462a8f74c3d0ddd28897fb8"
 *         userid:
 *           type: string
 *           example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *         title:
 *           type: string
 *           example: "Mediterranean Pasta Salad"
 *         thumb:
 *           type: string
 *           example: "https://ftp.goit.study/img/so-yummy/preview/Mediterranean%20Pasta%20Salad.jpg"
 *         description:
 *           type: string
 *           example: "A salad made with pasta, vegetables..."
 *         favoritesCount:
 *           type: integer
 *           example: 1
 *
 *     IngredientInRecipe:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "640c2dd963a319ea671e3724"
 *         name:
 *           type: string
 *           example: "Mozzarella Balls"
 *         img:
 *           type: string
 *           example: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3724.png"
 *         description:
 *           type: string
 *           example: "Small, round balls of mozzarella cheese..."
 *         measure:
 *           type: string
 *           example: "200 g"
 *
 *     Recipe:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6462a8f74c3d0ddd28897fb8"
 *         userid:
 *           type: string
 *           example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *         title:
 *           type: string
 *           example: "Mediterranean Pasta Salad"
 *         categoryid:
 *           type: string
 *           example: "6462a6cd4c3d0ddd28897f8a"
 *         areaid:
 *           type: string
 *           example: "6462a6f04c3d0ddd28897f9c"
 *         time:
 *           type: integer
 *           example: 27
 *         description:
 *           type: string
 *           example: "A salad made with pasta, vegetables..."
 *         thumb:
 *           type: string
 *           example: "https://ftp.goit.study/img/so-yummy/preview/Mediterranean%20Pasta%20Salad.jpg"
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IngredientInRecipe'
 *
 *     RecipePreview:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6467fb9d3d8125271a59219e"
 *         userid:
 *           type: string
 *           example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *         title:
 *           type: string
 *           example: "Oatmeal Cookies With Peanuts"
 *         thumb:
 *           type: string
 *           example: "https://ftp.goit.study/img/so-yummy/preview/Oatmeal%20Cookies%20With%20Peanuts.jpg"
 *         areaid:
 *           type: string
 *           example: "6462a6f04c3d0ddd28897f9b"
 *         categoryid:
 *           type: string
 *           example: "6462a6cd4c3d0ddd28897f8f"
 *         description:
 *           type: string
 *           example: "Cookies are seasonless, do you agree with me?..."
 *
 *     RecipesListResponse:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 285
 *         page:
 *           type: integer
 *           example: 1
 *         totalPages:
 *           type: integer
 *           example: 24
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipePreview'
 */
