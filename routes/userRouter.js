import { Router } from "express";

import authenticate from "../middlewares/authenticate.js";
import {
  getFollowersController,
  getFollowingController,
  followUserController,
  unfollowUserController,
  getUserInfoByIdController,
  getCurrentUserController,
} from "../controllers/usersController.js";

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
 * /api/users/following:
 *   get:
 *     summary: Get users that the current user is following
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /api/users/{userId}/follow:
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
userRouter.post("/:userId/follow", authenticate, followUserController);

/**
 * @swagger
 * /api/users/{userId}/follow:
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
userRouter.delete("/:userId/follow", authenticate, unfollowUserController);


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
