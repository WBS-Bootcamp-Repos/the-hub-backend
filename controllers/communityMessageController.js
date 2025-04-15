import models from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
const { Message, User } = models;

// GET all messages for a specific community
export const getCommunityMessages = asyncHandler(async (req, res) => {
  const { communityId } = req.params;

  const messages = await Message.findAll({
    where: { community_id: communityId },
    order: [["createdAt", "ASC"]],
    include: {
      model: User,
      attributes: ["id", "username", "profile_picture"],
    },
  });

  res.status(200).json(messages);
});

// POST new message to a community
export const createCommunityMessage = asyncHandler(async (req, res, next) => {
  const user_id = req.user.id;
  const { communityId } = req.params;

  if (!user_id || !content) {
    return next(new ErrorResponse("user_id and content are required", 400));
  }

  const user = await User.findByPk(user_id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  const newMessage = await Message.create({
    user_id,
    content,
    community_id: communityId,
  });

  res.status(201).json(newMessage);
});
