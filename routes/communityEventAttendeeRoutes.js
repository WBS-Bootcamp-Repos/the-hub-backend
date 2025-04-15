import { Router } from "express";
import {
  getCommunityEventAttendees,
  addCommunityEventAttendee,
  removeCommunityEventAttendee,
} from "../controllers/communityEventAttendeeController.js";
import auth from "../middleware/auth.js";
import { requireAdmin } from "../middleware/checkCommunityRole.js";

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Community Event Attendees
 *   description: Manage attendees in community-based events
 */

/**
 * @swagger
 * /communities/{communityId}/events/{eventId}/attendees:
 *   get:
 *     summary: Get attendees of a community event
 *     tags: [Community Event Attendees]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of attendees
 *       404:
 *         description: Event not found
 */
router.get("/", auth, getCommunityEventAttendees);

/**
 * @swagger
 * /communities/{communityId}/events/{eventId}/attendees:
 *   post:
 *     summary: Add attendee to community event
 *     tags: [Community Event Attendees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: eventId
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
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Attendee added
 *       400:
 *         description: Already added or missing data
 */
router.post("/", auth, requireAdmin, addCommunityEventAttendee);

/**
 * @swagger
 * /communities/{communityId}/events/{eventId}/attendees/{userId}:
 *   delete:
 *     summary: Remove an attendee from a community event
 *     tags: [Community Event Attendees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendee removed
 *       404:
 *         description: Not found
 */
router.delete("/:userId", auth, requireAdmin, removeCommunityEventAttendee);

export default router;
