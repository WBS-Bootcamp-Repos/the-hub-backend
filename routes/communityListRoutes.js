import { Router } from "express";
import {
  createCommunityList,
  getCommunityLists,
  getCommunityListById,
  updateCommunityList,
  deleteCommunityList,
} from "../controllers/communityListController.js";
import auth from "../middleware/auth.js";
import { requireAdmin } from "../middleware/checkCommunityRole.js";

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Community Lists
 *   description: Lists within a specific community
 */

/**
 * @swagger
 * /communities/{communityId}/lists:
 *   get:
 *     summary: Get all lists in a community
 *     tags: [Community Lists]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of community lists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to load lists
 */
router.get("/", auth, getCommunityLists);

/**
 * @swagger
 * /communities/{communityId}/lists/{listId}:
 *   get:
 *     summary: Get a specific list in a community
 *     tags: [Community Lists]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List details
 *       404:
 *         description: List not found
 */
router.get("/:listId", auth, getCommunityListById);

/**
 * @swagger
 * /communities/{communityId}/lists:
 *   post:
 *     summary: Create a new list in a community (admin only)
 *     tags: [Community Lists]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - privacy
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Sprint Tasks"
 *               category:
 *                 type: string
 *                 example: "Development"
 *               privacy:
 *                 type: string
 *                 example: "Public"
 *     responses:
 *       201:
 *         description: List created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Admin rights required
 */
router.post("/", auth, requireAdmin, createCommunityList);

/**
 * @swagger
 * /communities/{communityId}/lists/{listId}:
 *   put:
 *     summary: Update a list in a community (admin only)
 *     tags: [Community Lists]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               privacy:
 *                 type: string
 *     responses:
 *       200:
 *         description: List updated
 *       404:
 *         description: List not found
 *       403:
 *         description: Admin rights required
 */
router.put("/:listId", auth, requireAdmin, updateCommunityList);

/**
 * @swagger
 * /communities/{communityId}/lists/{listId}:
 *   delete:
 *     summary: Delete a list in a community (admin only)
 *     tags: [Community Lists]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List deleted
 *       404:
 *         description: List not found
 *       403:
 *         description: Admin rights required
 */
router.delete("/:listId", auth, requireAdmin, deleteCommunityList);

export default router;
