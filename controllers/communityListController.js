import models from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import listSchema from "../schemas/listSchema.js";
import communityListSchema from "../schemas/communityListSchema.js";

const { List, ListItem, Community } = models;

// Create list inside a community
export const createCommunityList = asyncHandler(async (req, res, next) => {
  const { error } = communityListSchema.POST.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const { title, category, privacy } = req.body;
  const { communityId } = req.params;

  const list = await List.create({
    title,
    category,
    privacy,
    user_id: req.user.id,
    community_id: communityId,
  });

  res.status(201).json(list);
});

// Get all lists in a community
export const getCommunityLists = asyncHandler(async (req, res) => {
  const { communityId } = req.params;

  const lists = await List.findAll({
    where: { community_id: communityId },
    order: [["createdAt", "DESC"]],
    include: [{ model: ListItem }],
  });

  res.status(200).json(lists);
});

// Get single list in a community
export const getCommunityListById = asyncHandler(async (req, res, next) => {
  const { communityId, listId } = req.params;

  const list = await List.findOne({
    where: {
      id: listId,
      community_id: communityId,
    },
    include: [{ model: ListItem }],
  });

  if (!list) return next(new ErrorResponse("List not found in community", 404));

  res.status(200).json(list);
});

// Update list in a community
export const updateCommunityList = asyncHandler(async (req, res, next) => {
  const { error } = communityListSchema.PUT.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const { communityId, listId } = req.params;
  const { title, category, privacy } = req.body;

  const list = await List.findOne({
    where: {
      id: listId,
      community_id: communityId,
    },
  });

  if (!list) return next(new ErrorResponse("List not found", 404));

  list.title = title ?? list.title;
  list.category = category ?? list.category;
  list.privacy = privacy ?? list.privacy;

  await list.save();

  res.status(200).json(list);
});

// Delete list in a community
export const deleteCommunityList = asyncHandler(async (req, res, next) => {
  const { communityId, listId } = req.params;

  const list = await List.findOne({
    where: {
      id: listId,
      community_id: communityId,
    },
  });

  if (!list) return next(new ErrorResponse("List not found", 404));

  await list.destroy();
  res.status(200).json({ message: "List deleted successfully." });
});
