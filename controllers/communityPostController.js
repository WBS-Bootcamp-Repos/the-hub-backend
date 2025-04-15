import models from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import postSchema from "../schemas/postSchema.js";
import communityPostSchema from "../schemas/communityPostSchema.js";

const { Post, User } = models;

// GET /communities/:communityId/posts
export const getCommunityPosts = asyncHandler(async (req, res) => {
  const { communityId } = req.params;

  const posts = await Post.findAll({
    where: { community_id: communityId },
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "username", "profile_picture"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  res.status(200).json(posts);
});

// POST /communities/:communityId/posts
export const createCommunityPost = asyncHandler(async (req, res, next) => {
  const { error } = communityPostSchema.POST.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const { communityId } = req.params;
  const userId = req.user.id;

  const post = await Post.create({
    ...req.body,
    userId,
    community_id: communityId,
  });

  res.status(201).json(post);
});

// GET /communities/:communityId/posts/:postId
export const getCommunityPostById = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findByPk(postId, {
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "username", "profile_picture"],
      },
    ],
  });

  if (!post || post.community_id !== parseInt(req.params.communityId)) {
    return next(new ErrorResponse("Post not found", 404));
  }

  res.status(200).json(post);
});

// PUT /communities/:communityId/posts/:postId
export const updateCommunityPost = asyncHandler(async (req, res, next) => {
  const { error } = communityPostSchema.PUT.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const post = await Post.findByPk(req.params.postId);

  if (!post || post.community_id !== parseInt(req.params.communityId)) {
    return next(new ErrorResponse("Post not found", 404));
  }

  await post.update(req.body);
  res.status(200).json(post);
});

// DELETE /communities/:communityId/posts/:postId
export const deleteCommunityPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByPk(req.params.postId);

  if (!post || post.community_id !== parseInt(req.params.communityId)) {
    return next(new ErrorResponse("Post not found", 404));
  }

  await post.destroy();
  res.status(200).json({ message: "Post deleted" });
});
