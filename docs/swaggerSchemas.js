/**
 * @swagger
 * components:
 *   schemas:
 *     PopularRecipe:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6462a8f74c3d0ddd28897fe0"
 *         title:
 *           type: string
 *           example: "Ribollita"
 *         thumb:
 *           type: string
 *           nullable: true
 *           example: "https://ftp.goit.study/img/so-yummy/preview/Ribollita.jpg"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "A Tuscan soup made with vegetables, bread, and beans, often served as a hearty main dish."
 *         Creator:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *             username:
 *               type: string
 *               example: "Darya"
 *             avatar:
 *               type: string
 *               nullable: true
 *               example: null
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
 *           example: "6462a8f74c3d0ddd28897fe3"
 *
 *         title:
 *           type: string
 *           example: "Full English Breakfast"
 *
 *         time:
 *           type: integer
 *           description: Cooking time in minutes
 *           example: 30
 *
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Similar to the English Breakfast, but with additional items like black pudding..."
 *
 *         instructions:
 *           type: string
 *           example: "Heat the flat grill plate over a low heat..."
 *
 *         thumb:
 *           type: string
 *           nullable: true
 *           example: "recipes/6462a8f74c3d0ddd28897fe3/image.webp"
 *
 *         Creator:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "wh8ghsPfXj_QSIowtir9_"
 *             username:
 *               type: string
 *               example: "johndoe"
 *             avatar:
 *               type: string
 *               nullable: true
 *               example: null
 *
 *         category:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "6462a6cd4c3d0ddd28897f95"
 *             name:
 *               type: string
 *               example: "Breakfast"
 *
 *         area:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "6462a6f04c3d0ddd28897fa1"
 *             name:
 *               type: string
 *               example: "British"
 *
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
 *           example: "6462a8f74c3d0ddd288980b8"
 *         title:
 *           type: string
 *           example: "Chicken Marengo"
 *         thumb:
 *           type: string
 *           nullable: true
 *           example: "https://ftp.goit.study/img/so-yummy/preview/Chicken%20Marengo.jpg"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "A classic French chicken dish made with sautéed chicken in a tomato and wine sauce..."
 *         Creator:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *             username:
 *               type: string
 *               example: "Darya"
 *             avatar:
 *               type: string
 *               nullable: true
 *               example: null
 *         category:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "6462a6cd4c3d0ddd28897f8d"
 *             name:
 *               type: string
 *               example: "Chicken"
 *         area:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "6462a6f04c3d0ddd28897fa3"
 *             name:
 *               type: string
 *               example: "French"
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
