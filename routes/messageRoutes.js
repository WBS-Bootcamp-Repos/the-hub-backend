import { Router } from "express";
import {
  getAllMessages,
  getMessageById,
  addMessage,
} from "../controllers/messageController.js";
const messageRoutes = Router();

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages with user data
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages with user info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1001
 *                   content:
 *                     type: string
 *                     example: "Hey, how's the project going?"
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-21T09:00:00Z"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-21T09:00:00Z"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: "johndoe"
 *                       profile_picture:
 *                         type: string
 *                         example: "https://example.com/profile/johndoe.jpg"
 *       500:
 *         description: Internal server error
 */
messageRoutes.get("/", getAllMessages);
/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the message to retrieve
 *     responses:
 *       200:
 *         description: The message data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 text:
 *                   type: string
 *                   example: "Hello world"
 *       404:
 *         description: Message not found
 */
messageRoutes.get("/:id", getMessageById);
/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - content
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: "Hello everyone!"
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1003
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 content:
 *                   type: string
 *                   example: "Hello everyone!"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:00:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:00:00Z"
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
messageRoutes.post("/", addMessage);

export default messageRoutes;
