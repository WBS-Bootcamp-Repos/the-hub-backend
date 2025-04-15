import express from "express";
import {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import auth from "../middleware/auth.js";
const eventRoutes = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all events
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
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Hackathon 2025"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-05-10"
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-10T09:00:00Z"
 *                   end_time:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-10T18:00:00Z"
 *                   description:
 *                     type: string
 *                     example: "A full-day coding event to build cool stuff."
 *                   location:
 *                     type: string
 *                     example: "Tech Hub Berlin"
 *                   type:
 *                     type: string
 *                     example: "Tech"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-27T10:40:00Z"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-27T10:40:00Z"
 *       500:
 *         description: Failed to fetch events
 */
eventRoutes.get("/", auth, getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Hackathon 2025"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-10"
 *                 start_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-10T09:00:00Z"
 *                 end_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-10T18:00:00Z"
 *                 description:
 *                   type: string
 *                   example: "A full-day coding event to build cool stuff."
 *                 location:
 *                   type: string
 *                   example: "Tech Hub Berlin"
 *                 type:
 *                   type: string
 *                   example: "Tech"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to fetch event
 */
eventRoutes.get("/:id", auth, getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *               - date
 *               - start_time
 *               - description
 *               - type
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Team Meeting"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-01T10:00:00Z"
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-01T11:00:00Z"
 *               description:
 *                 type: string
 *                 example: "Weekly team sync meeting."
 *               location:
 *                 type: string
 *                 example: "Conference Room A"
 *               type:
 *                 type: string
 *                 example: "Meeting"
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Team Meeting"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025-06-01"
 *                 start_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-01T10:00:00Z"
 *                 end_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-01T11:00:00Z"
 *                 description:
 *                   type: string
 *                   example: "Weekly team sync meeting."
 *                 location:
 *                   type: string
 *                   example: "Conference Room A"
 *                 type:
 *                   type: string
 *                   example: "Meeting"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error creating event
 */
eventRoutes.post("/", auth, createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Updated Team Meeting"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-01T10:00:00Z"
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-01T11:30:00Z"
 *               description:
 *                 type: string
 *                 example: "Updated weekly team sync meeting."
 *               location:
 *                 type: string
 *                 example: "Conference Room B"
 *               type:
 *                 type: string
 *                 example: "Meeting"
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Updated Team Meeting"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025-06-01"
 *                 start_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-01T10:00:00Z"
 *                 end_time:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-01T11:30:00Z"
 *                 description:
 *                   type: string
 *                   example: "Updated weekly team sync meeting."
 *                 location:
 *                   type: string
 *                   example: "Conference Room B"
 *                 type:
 *                   type: string
 *                   example: "Meeting"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:45:00Z"
 *       400:
 *         description: No fields provided for update
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to update event
 */
eventRoutes.put("/:id", auth, updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete a specific event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event deleted successfully."
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to delete event
 */
eventRoutes.delete("/:id", auth, deleteEvent);

export default eventRoutes;
