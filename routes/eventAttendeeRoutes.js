import express from "express";
import {
  getEventAttendees,
  createEventAttendee,
  getEventAttendeeById,
  updateEventAttendee,
  deleteEventAttendee,
} from "../controllers/eventAttendeeController.js";
import auth from "../middleware/auth.js";

const eventAttendeeRoutes = express.Router();

/**
 * @swagger
 * /eventattendees:
 *   get:
 *     summary: Get all event attendees
 *     tags: [EventAttendees]
 *     responses:
 *       200:
 *         description: A list of all event attendees
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
 *                   event_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-27T10:40:00Z"
 *       500:
 *         description: Failed to fetch all event attendees
 */
eventAttendeeRoutes.get("/", auth, getEventAttendees);

/**
 * @swagger
 * /eventattendees/{id}:
 *   get:
 *     summary: Get a specific event attendee by ID
 *     tags: [EventAttendees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event attendee to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single event attendee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 event_id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       404:
 *         description: Event Attendee not found
 *       500:
 *         description: Failed to fetch Event Attendee
 */
eventAttendeeRoutes.get("/:id", auth, getEventAttendeeById);

/**
 * @swagger
 * /eventattendees:
 *   post:
 *     summary: Create a new event attendee
 *     tags: [EventAttendees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - user_id
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Event attendee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 event_id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       400:
 *         description: Event_id and user_id are required
 *       500:
 *         description: Error creating Event Attendee
 */
eventAttendeeRoutes.post("/", auth, createEventAttendee);

/**
 * @swagger
 * /eventattendees/{id}:
 *   put:
 *     summary: Update an existing event attendee
 *     tags: [EventAttendees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event attendee to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 2
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Event attendee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 event_id:
 *                   type: integer
 *                   example: 2
 *                 user_id:
 *                   type: integer
 *                   example: 2
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       400:
 *         description: Event_id or user_id must be provided for update
 *       404:
 *         description: Event Attendee not found
 *       500:
 *         description: Failed to update event attendee
 */
eventAttendeeRoutes.put("/:id", auth, updateEventAttendee);

/**
 * @swagger
 * /eventattendees/{id}:
 *   delete:
 *     summary: Delete a specific event attendee
 *     tags: [EventAttendees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event attendee to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event attendee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event Attendee deleted successfully."
 *       404:
 *         description: Event Attendee not found
 *       500:
 *         description: Failed to delete event attendee
 */
eventAttendeeRoutes.delete("/:id", auth, deleteEventAttendee);

export default eventAttendeeRoutes;
