import { Router } from "express";

import authenticate from "../middlewares/authenticate.js";
import {
  getFollowersController,
  getFollowingController,
  followUserController,
  unfollowUserController,
} from "../controllers/usersController.js";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User follow relationships
 */

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
 *           type: integer
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
 *                     type: integer
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
 *                     type: integer
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
 *           type: integer
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
 *           type: integer
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

export default userRouter;
