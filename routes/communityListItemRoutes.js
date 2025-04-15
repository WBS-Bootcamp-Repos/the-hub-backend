import { Router } from "express";
import {
  getCommunityListItems,
  createCommunityListItem,
  updateCommunityListItem,
  deleteCommunityListItem,
} from "../controllers/communityListItemController.js";
import auth from "../middleware/auth.js";
import { requireAdmin } from "../middleware/checkCommunityRole.js";

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Community List Items
 *   description: Items in community-based lists
 */

/**
 * @swagger
 * /communities/{communityId}/lists/{listId}/items:
 *   get:
 *     summary: Get all items in a community list
 *     tags: [Community List Items]
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
 *     responses:
 *       200:
 *         description: List of items
 *       404:
 *         description: List not found
 */
router.get("/", auth, getCommunityListItems);

/**
 * @swagger
 * /communities/{communityId}/lists/{listId}/items:
 *   post:
 *     summary: Add item to a community list
 *     tags: [Community List Items]
 *     security:
 *       - bearerAuth: []
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
 *               is_completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Item created
 *       400:
 *         description: Missing name
 *       404:
 *         description: List not found
 */
router.post("/", auth, requireAdmin, createCommunityListItem);

/**
 * @swagger
 * /communities/{communityId}/lists/{listId}/items/{itemId}:
 *   put:
 *     summary: Update a community list item
 *     tags: [Community List Items]
 *     security:
 *       - bearerAuth: []
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
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               is_completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item or list not found
 */
router.put("/:itemId", auth, requireAdmin, updateCommunityListItem);

/**
 * @swagger
 * /communities/{communityId}/lists/{listId}/items/{itemId}:
 *   delete:
 *     summary: Delete a community list item
 *     tags: [Community List Items]
 *     security:
 *       - bearerAuth: []
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
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
router.delete("/:itemId", auth, requireAdmin, deleteCommunityListItem);

export default router;
