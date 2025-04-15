import express from "express";
import {
  getLists,
  getListById,
  createList,
  updateList,
  getListsPerUserId,
} from "../controllers/listController.js";
import {
  getListItems,
  getListItemById,
  createListItem,
  updateListItem,
  deleteListItem,
} from "../controllers/listItemController.js";

const listRoutes = express.Router();

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists with user and list item data
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: A list of all lists including user and list items
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
 *                   title:
 *                     type: string
 *                     example: "Groceries"
 *                   category:
 *                     type: string
 *                     example: "Shopping"
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   privacy:
 *                     type: string
 *                     example: "Private"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                   list_items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         list_id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Red Apples (2kg)"
 *                         is_completed:
 *                           type: boolean
 *                           example: false
 *       500:
 *         description: Failed to fetch lists
 */
listRoutes.get("/", getLists);

/**
 * @swagger
 * /lists/{user_id}:
 *   get:
 *     summary: Get all lists for a specific user, including user and list item data
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of all lists belonging to the specified user
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
 *                   title:
 *                     type: string
 *                     example: "Groceries"
 *                   category:
 *                     type: string
 *                     example: "Shopping"
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   privacy:
 *                     type: string
 *                     example: "Private"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                   list_items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         list_id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Red Apples (2kg)"
 *                         is_completed:
 *                           type: boolean
 *                           example: false
 *       500:
 *         description: Failed to fetch lists
 */
listRoutes.get("/:user_id", getListsPerUserId);

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Get a specific list by ID with its items
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the list to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single list with list items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Groceries"
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 category:
 *                   type: string
 *                   example: "Shopping"
 *                 private:
 *                   type: string
 *                   example: "Private"
 *                 list_items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       list_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Red Apples (2kg)"
 *                       is_completed:
 *                         type: boolean
 *                         example: false
 *       404:
 *         description: List not found
 *       500:
 *         description: Failed to fetch list
 */
listRoutes.get("/:id", getListById);
/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Create a new list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *               - category
 *               - privacy
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Week Plan"
 *               category:
 *                 type: string
 *                 example: "To Do"
 *               privacy:
 *                 type: string
 *                 example: "Private"
 *     responses:
 *       201:
 *         description: List created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 403
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Week Plan"
 *                 category:
 *                   type: string
 *                   example: "To Do"
 *                 privacy:
 *                   type: string
 *                   example: "Private"
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
 *         description: Error creating list
 */
listRoutes.post("/", createList);
/**
 * @swagger
 * /lists/{id}:
 *   put:
 *     summary: Update an existing list (not part of MVP)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the list to update
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
 *                 example: "Week Plan"
 *               category:
 *                 type: string
 *                 example: "To Do"
 *               privacy:
 *                 type: string
 *                 example: "Private"
 *     responses:
 *       200:
 *         description: List updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 403
 *                 title:
 *                   type: string
 *                   example: "Week Plan"
 *                 category:
 *                   type: string
 *                   example: "To Do"
 *                 privacy:
 *                   type: string
 *                   example: "Private"
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       400:
 *         description: No fields provided for update
 *       404:
 *         description: List not found
 *       500:
 *         description: Failed to update list
 */
listRoutes.put("/:id", updateList);
/**
 * @swagger
 * /lists/{list_id}/items:
 *   get:
 *     summary: Get all items for a specific list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list to retrieve items for
 *     responses:
 *       200:
 *         description: List of items for the given list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 501
 *                   list_id:
 *                     type: integer
 *                     example: 401
 *                   name:
 *                     type: string
 *                     example: "Milk"
 *                   is_completed:
 *                     type: boolean
 *                     example: false
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-23T08:15:00Z"
 *       500:
 *         description: Failed to fetch list items
 */
listRoutes.get("/:list_id/items", getListItems);
/**
 * @swagger
 * /lists/{listId}/items/{itemId}:
 *   get:
 *     summary: Get a specific item from a list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list item
 *     responses:
 *       200:
 *         description: The requested list item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 501
 *                 list_id:
 *                   type: integer
 *                   example: 401
 *                 name:
 *                   type: string
 *                   example: "Milk"
 *                 is_completed:
 *                   type: boolean
 *                   example: false
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-23T08:15:00Z"
 *       404:
 *         description: List item not found
 *       500:
 *         description: Failed to fetch list item
 */
listRoutes.get("/:listId/items/:itemId", getListItemById);
/**
 * @swagger
 * /lists/{listId}/items:
 *   post:
 *     summary: Create a new list item under a specific list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list to add the item to
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
 *                 example: "Exercise"
 *               is_completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: List item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 503
 *                 list_id:
 *                   type: integer
 *                   example: 401
 *                 name:
 *                   type: string
 *                   example: "Bread"
 *                 is_completed:
 *                   type: boolean
 *                   example: false
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:50:00Z"
 *       400:
 *         description: Missing required fields or validation error
 *       500:
 *         description: Error creating list item
 */
listRoutes.post("/:listId/items", createListItem);
/**
 * @swagger
 * /lists/{listId}/items/{itemId}:
 *   put:
 *     summary: Update a specific list item
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Exercise"
 *               is_completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: List item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 503
 *                 list_id:
 *                   type: integer
 *                   example: 401
 *                 name:
 *                   type: string
 *                   example: "Whole Wheat Bread"
 *                 is_completed:
 *                   type: boolean
 *                   example: true
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:50:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:55:00Z"
 *       400:
 *         description: No valid fields provided
 *       404:
 *         description: List item not found
 *       500:
 *         description: Failed to update list item
 */
listRoutes.put("/:listId/items/:itemId", updateListItem);
/**
 * @swagger
 * /lists/{listId}/items/{itemId}:
 *   delete:
 *     summary: Delete a specific list item
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the list item to delete
 *     responses:
 *       200:
 *         description: List item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted."
 *       404:
 *         description: List item not found
 *       500:
 *         description: Failed to delete list item
 */
listRoutes.delete("/:listId/items/:itemId", deleteListItem);
export default listRoutes;
