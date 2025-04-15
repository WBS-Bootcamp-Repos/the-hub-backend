import express from "express";
import {
  createCommunityMessage,
  getCommunityMessages,
} from "../controllers/communityMessageController.js";
import auth from "../middleware/auth.js";
import { checkMembership } from "../middleware/checkMembership.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: CommunityMessages
 *   description: Messages within communities
 */

/**
 * @swagger
 * /communities/{communityId}/messages:
 *   get:
 *     summary: Get all messages in a specific community
 *     tags: [CommunityMessages]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the community
 *     responses:
 *       200:
 *         description: A list of messages
 *       500:
 *         description: Server error
 */
router.get("/", auth, checkMembership, getCommunityMessages);

/**
 * @swagger
 * /communities/{communityId}/messages:
 *   post:
 *     summary: Create a new message in a community
 *     tags: [CommunityMessages]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the community
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
 *                 example: "Hey everyone 👋"
 *     responses:
 *       201:
 *         description: Message created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", auth, checkMembership, createCommunityMessage);

export default router;
