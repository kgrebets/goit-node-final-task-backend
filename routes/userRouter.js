import { Router } from "express";

import authenticate from "../middlewares/authenticate.js";
import {
  getFollowersController,
  getFollowingController,
  followUserController,
  unfollowUserController,
  getUserInfoByIdController,
  getCurrentUserController,
  getLoggedInUserRecipesController,
  getUserRecipesController,
  updateCurrentUserAvatar
} from "../controllers/usersController.js";
import { getUserRecipesSchema } from "../schemas/recipesSchemas.js";
import validateQuery from "../helpers/validateQuery.js";
import upload from "../middlewares/upload.js";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and follow relationships
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user information
 *     description: Returns the authenticated user's profile information including avatar, name, email, and various counts (recipes, favorites, followers, following)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User's unique identifier
 *                 name:
 *                   type: string
 *                   description: User's display name
 *                 email:
 *                   type: string
 *                   description: User's email address
 *                 avatar:
 *                   type: string
 *                   nullable: true
 *                   description: URL to user's avatar image
 *                 recipesCount:
 *                   type: integer
 *                   description: Number of recipes created by the user
 *                 favoritesCount:
 *                   type: integer
 *                   description: Number of recipes marked as favorite
 *                 followersCount:
 *                   type: integer
 *                   description: Number of users following this user
 *                 followingCount:
 *                   type: integer
 *                   description: Number of users this user is following
 *       401:
 *         description: Unauthorized - Authentication required
 */
userRouter.get("/me", authenticate, getCurrentUserController);

/**
 * @swagger
 * /api/users/me/avatar:
 *   post:
 *     summary: Update current user's avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Successfully updated current user's avatar
 *       400:
 *         description: Invalid request (e.g., cannot update avatar)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.post("/me/avatar", authenticate, upload.single("avatar"), updateCurrentUserAvatar);

/**
 * @swagger
 * /api/users/recipes:
 *   get:
 *     summary: Get recipes of the logged-in user
 *     description: Returns a paginated list of recipes created by the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 12
 *         description: Number of recipes per page
 *     responses:
 *       200:
 *         description: Paginated list of user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 5
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "Lcr2qK0ukWY3o7pQRn3lf"
 *                       title:
 *                         type: string
 *                         example: "Integration test recipe"
 *                       categoryid:
 *                         type: string
 *                         example: "6462a6cd4c3d0ddd28897f8d"
 *                       areaid:
 *                         type: string
 *                         example: "6462a6f04c3d0ddd28897f9b"
 *                       thumb:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       time:
 *                         type: integer
 *                         example: 45
 *       401:
 *         description: Unauthorized
 */

userRouter.get(
  "/recipes",
  authenticate,
  validateQuery(getUserRecipesSchema),
  getLoggedInUserRecipesController
);

/**
 * @swagger
 * /api/users/following:
 *   get:
 *     summary: Get users that the current user is following
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose followers are requested
 *     responses:
 *       200:
 *         description: List of users the current user follows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   avatar:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/following", authenticate, getFollowingController);

//USER-SCOPED ROUTES

/**
 * @swagger
 * /api/users/{userId}/recipes:
 *   get:
 *     summary: Get recipes of a specific user
 *     description: Returns a paginated list of recipes created by the specified user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 12
 *         description: Number of recipes per page
 *     responses:
 *       200:
 *         description: Paginated list of user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       categoryid:
 *                         type: string
 *                       areaid:
 *                         type: string
 *                       thumb:
 *                         type: string
 *                       time:
 *                         type: integer
 *       404:
 *         description: User not found
 */
userRouter.get("/:userId/followers", authenticate, getFollowersController);

userRouter.get(
  "/:userId/recipes",
  validateQuery(getUserRecipesSchema),
  getUserRecipesController
);

/**
 * @swagger
 * /api/users/{userId}/followers:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose followers are requested
 *     responses:
 *       200:
 *         description: List of followers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   avatar:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.get("/:userId/followers", authenticate, getFollowersController);

/**
 * @swagger
 * /api/users/{userId}/followers:
 *   post:
 *     summary: Follow a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to follow
 *     responses:
 *       201:
 *         description: Successfully followed user
 *       400:
 *         description: Invalid request (e.g., cannot follow yourself)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.post("/:userId/followers", authenticate, followUserController);

/**
 * @swagger
 * /api/users/{userId}/followers:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Successfully unfollowed user
 *       400:
 *         description: Invalid request (e.g., cannot unfollow yourself)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.delete("/:userId/followers", authenticate, unfollowUserController);

//GENERIC USER ROUTE (MUST BE LAST)
/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get detailed info about another user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User detailed info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatar:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 recipesCount:
 *                   type: integer
 *                 followersCount:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.get("/:userId", authenticate, getUserInfoByIdController);

export default userRouter;
