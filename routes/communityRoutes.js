import { Router } from "express";
import {
  getCommunities,
  createCommunity,
  updateCommunity,
  getMyCommunities,
  deleteCommunity,
  getCommunityById,
  joinCommunity,
  getCommunitySettings,
  updateCommunitySettings,
  getCommunityPinBoard,
  updateCommunityPinBoard,
  leaveCommunity,
} from "../controllers/communityController.js";

import auth from "../middleware/auth.js";
import { requireAdmin } from "../middleware/checkCommunityRole.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Communities
 *   description: Community management and membership
 */

/**
 * @swagger
 * /communities:
 *   get:
 *     summary: Get all communities
 *     tags: [Communities]
 *     responses:
 *       200:
 *         description: A list of communities
 *       500:
 *         description: Server error
 */
router.get("/", getCommunities);

/**
 * @swagger
 * /communities/my:
 *   get:
 *     summary: Get communities the user belongs to
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user’s communities
 *       401:
 *         description: Unauthorized
 */
router.get("/my", auth, getMyCommunities);

/**
 * @swagger
 * /communities:
 *   post:
 *     summary: Create a new community
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Community created successfully
 *       400:
 *         description: Missing name
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth, createCommunity);

/**
 * @swagger
 * /communities/{id}/join:
 *   post:
 *     summary: Join an existing community
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Joined successfully
 *       400:
 *         description: Already a member
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/:id/join", auth, joinCommunity);

/**
 * @swagger
 * /communities/{id}:
 *   get:
 *     summary: Get a specific community by ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community found
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.get("/:id", auth, getCommunityById);

/**
 * @swagger
 * /communities/{id}:
 *   put:
 *     summary: Update a community (admin only)
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Community updated
 *       403:
 *         description: Admin rights required
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth, requireAdmin, updateCommunity);

/**
 * @swagger
 * /communities/{id}:
 *   delete:
 *     summary: Delete a community (admin only)
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community deleted
 *       403:
 *         description: Admin rights required
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, requireAdmin, deleteCommunity);

/**
 * @swagger
 * /communities/{id}/settings:
 *   get:
 *     summary: Get settings of a specific community
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the community
 *     responses:
 *       200:
 *         description: Community settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 calendar:
 *                   type: boolean
 *                   example: true
 *                 lists:
 *                   type: boolean
 *                   example: true
 *                 posts:
 *                   type: boolean
 *                   example: true
 *                 events:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.get("/:id/settings", auth, getCommunitySettings);

/**
 * @swagger
 * /communities/{id}/settings:
 *   put:
 *     summary: Update settings of a specific community (admin only)
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - settings
 *             properties:
 *               settings:
 *                 type: object
 *                 properties:
 *                   calendar:
 *                     type: boolean
 *                     example: true
 *                   lists:
 *                     type: boolean
 *                     example: false
 *                   posts:
 *                     type: boolean
 *                     example: true
 *                   events:
 *                     type: boolean
 *                     example: true
 *                   messages:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin rights required
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.put("/:id/settings", auth, requireAdmin, updateCommunitySettings);

/**
 * @swagger
 * /communities/{id}/pinboard:
 *   get:
 *     summary: Get pinned apps on the community pin board
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the community
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of pinned apps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pin_board:
 *                   type: array
 *                   example: ["calendar", "posts", "lists"]
 *       404:
 *         description: Community not found
 */
router.get("/:id/pinboard", auth, getCommunityPinBoard);

/**
 * @swagger
 * /communities/{id}/pinboard:
 *   put:
 *     summary: Update pinned apps on the community pin board (admin only)
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the community
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pin_board
 *             properties:
 *               pin_board:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["calendar", "lists", "messages"]
 *     responses:
 *       200:
 *         description: Pinboard updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pinboard updated
 *                 pin_board:
 *                   type: array
 *                   example: ["calendar", "lists"]
 *       400:
 *         description: Validation error or invalid apps
 *       403:
 *         description: Admin rights required
 *       404:
 *         description: Community not found
 */
router.put("/:id/pinboard", auth, requireAdmin, updateCommunityPinBoard);

/**
 * @swagger
 * /communities/{id}/leave:
 *   post:
 *     summary: Leave a community
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the community
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully left the community
 *       400:
 *         description: Not a member of this community
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.delete("/:id/leave", auth, leaveCommunity);

export default router;
