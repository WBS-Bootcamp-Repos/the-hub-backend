import express from "express";
import {
  createCommunityPost,
  deleteCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
} from "../controllers/communityPostController.js";
import auth from "../middleware/auth.js";
import { checkMembership } from "../middleware/checkMembership.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: CommunityPosts
 *   description: Manage posts within a community
 */

/**
 * @swagger
 * /communities/{communityId}/posts:
 *   get:
 *     summary: Get all posts in a specific community
 *     tags: [CommunityPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the community
 *     responses:
 *       200:
 *         description: List of community posts
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (not a member)
 *       500:
 *         description: Server error
 *
 */
router.get("/", auth, checkMembership, getCommunityPosts);

/**
 * @swagger
 * /communities/{communityId}/posts:
 *   post:
 *     summary: Create a new post in a specific community
 *     tags: [CommunityPosts]
 *     security:
 *       - bearerAuth: []
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
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Weekly Update"
 *               content:
 *                 type: string
 *                 example: "Here's what we accomplished this week..."
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (not a member)
 *       500:
 *         description: Server error
 */
router.post("/", auth, checkMembership, createCommunityPost);

/**
 * @swagger
 * /communities/{communityId}/posts/{postId}:
 *   get:
 *     summary: Get a specific post from a community
 *     tags: [CommunityPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community post data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (not a member)
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/:postId", auth, checkMembership, getCommunityPostById);

/**
 * @swagger
 * /communities/{communityId}/posts/{postId}:
 *   put:
 *     summary: Update a specific community post
 *     tags: [CommunityPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
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
 *                 example: "Updated Post Title"
 *               content:
 *                 type: string
 *                 example: "Updated post content"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/updated.jpg"
 *     responses:
 *       200:
 *         description: Post updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.put("/:postId", auth, checkMembership, updateCommunityPost);

/**
 * @swagger
 * /communities/{communityId}/posts/{postId}:
 *   delete:
 *     summary: Delete a specific community post
 *     tags: [CommunityPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.delete("/:postId", auth, checkMembership, deleteCommunityPost);

export default router;
