import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/userController.js";
const userRoutes = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users with their community info
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: example
 *                   email:
 *                     type: string
 *                     example: example@example.com
 *                   profile_picture:
 *                     type: string
 *                     example: /images/avatar.png
 *                   community_id:
 *                     type: integer
 *                     example: 2
 *                   community:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: Tech Innovators
 *       500:
 *         description: Server error
 */
userRoutes.get("/", getUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID with community info
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithCommunity'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRoutes.get("/:id", getUserById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (community is optional)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: someSecurePassword
 *               profilePicture:
 *                 type: string
 *                 example: https://example.com/avatars/john.png
 *               community_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                     profilePicture:
 *                       type: string
 *                       example: https://example.com/avatars/john.png
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-15T12:00:00Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-15T12:00:00Z
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
userRoutes.post("/", createUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Fields to update (all optional)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johnnydoe
 *               email:
 *                 type: string
 *                 example: johnny@example.com
 *               profilePicture:
 *                 type: string
 *                 example: https://example.com/avatars/johnny.png
 *               community_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: johnnydoe
 *                 email:
 *                   type: string
 *                   example: johnny@example.com
 *                 profilePicture:
 *                   type: string
 *                   example: https://example.com/avatars/johnny.png
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-15T12:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-25T10:00:00Z
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRoutes.put("/:id", updateUser);

export default userRoutes;
