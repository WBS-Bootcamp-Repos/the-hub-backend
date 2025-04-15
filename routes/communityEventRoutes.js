import express from "express";
import {
  getCommunityEvents,
  createCommunityEvent,
  getCommunityEventById,
  updateCommunityEvent,
  deleteCommunityEvent,
} from "../controllers/communityEventController.js";

import auth from "../middleware/auth.js";
import { checkMembership } from "../middleware/checkMembership.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: CommunityEvents
 *   description: Events that belong to a community
 */

/**
 * @swagger
 * /communities/{communityId}/events:
 *   get:
 *     summary: Get all events of a specific community
 *     tags: [CommunityEvents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of community events
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not a member of the community
 */
router.get("/", auth, checkMembership, getCommunityEvents);

/**
 * @swagger
 * /communities/{communityId}/events:
 *   post:
 *     summary: Create a new event for a community
 *     tags: [CommunityEvents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
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
 *               - title
 *               - date
 *               - start_time
 *               - description
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not a member
 */
router.post("/", auth, checkMembership, createCommunityEvent);

/**
 * @swagger
 * /communities/{communityId}/events/{id}:
 *   get:
 *     summary: Get a specific community event by ID
 *     tags: [CommunityEvents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found in this community
 */
router.get("/:id", auth, checkMembership, getCommunityEventById);

/**
 * @swagger
 * /communities/{communityId}/events/{id}:
 *   put:
 *     summary: Update a community event
 *     tags: [CommunityEvents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
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
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Not found
 */
router.put("/:id", auth, checkMembership, updateCommunityEvent);

/**
 * @swagger
 * /communities/{communityId}/events/{id}:
 *   delete:
 *     summary: Delete a community event
 *     tags: [CommunityEvents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 */
router.delete("/:id", auth, checkMembership, deleteCommunityEvent);

export default router;
