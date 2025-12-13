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
 *     Ingredient:
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
 *
 *     RecipeIngredientItem:
 *       type: object
 *       properties:
 *         measure:
 *           type: string
 *           example: "200 g"
 *         ingredient:
 *           $ref: '#/components/schemas/Ingredient'
 *
 *     Recipe:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6462a8f74c3d0ddd28898049"
 *         title:
 *           type: string
 *           example: "Stamppot"
 *         category:
 *           type: string
 *           example: "Pork"
 *         categoryid:
 *           type: string
 *           example: "6462a6cd4c3d0ddd28897f91"
 *         userid:
 *           type: string
 *           example: "64c8d958249fae54bae90bb8"
 *         area:
 *           type: string
 *           example: "Dutch"
 *         areaid:
 *           type: string
 *           example: "6462a6f04c3d0ddd28897fa8"
 *         instructions:
 *           type: string
 *           example: "Wash and peel the potatoes..."
 *         description:
 *           type: string
 *           example: "A traditional Dutch dish made with mashed potatoes..."
 *         thumb:
 *           type: string
 *           example: "https://ftp.goit.study/img/so-yummy/preview/Stamppot.jpg"
 *         time:
 *           type: integer
 *           example: 40
 *         recipeIngredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredientItem'
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
 *         area:
 *           type: string
 *           example: "Ukrainian"
 *         areaid:
 *           type: string
 *           example: "6462a6f04c3d0ddd28897f9b"
 *         category:
 *           type: string
 *           example: "Dessert"
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
