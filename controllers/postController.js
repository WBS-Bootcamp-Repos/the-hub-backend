import models from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import postSchema from "../schemas/postSchema.js";

const { Post, User, Community } = models;

// Create a new post
export const createPost = asyncHandler(async (req, res, next) => {
  const { error } = postSchema.POST.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  if (req.body.communityId) {
    return next(
      new ErrorResponse("Cannot assign communityId to a private post.", 400)
    );
  }

  const post = await Post.create(req.body);
  res.status(201).json(post);
});

// Get all posts (optional user filter)
export const getAllPosts = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  const posts = await Post.findAll({
    where: userId ? { userId } : undefined,
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "username", "profile_picture"],
      },
      {
        model: Community,
        attributes: ["id", "name"],
      },
    ],
  });

  res.json(posts);
});

// Get post by ID
export const getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "username", "profile_picture"],
      },
      {
        model: Community,
        attributes: ["id", "name"],
      },
    ],
  });

  if (!post) return next(new ErrorResponse("Post not found", 404));

  res.json(post);
});

// Update post
export const updatePost = asyncHandler(async (req, res, next) => {
  const { error } = postSchema.PUT.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const post = await Post.findByPk(req.params.id);
  if (!post) return next(new ErrorResponse("Post not found", 404));

  await post.update(req.body);
  res.json(post);
});

// Delete post
export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return next(new ErrorResponse("Post not found", 404));

  await post.destroy();
  res.json({ message: "Post deleted" });
});
