import models from "../models/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const { Event, Community } = models;

// GET /communities/:communityId/events
export const getCommunityEvents = asyncHandler(async (req, res) => {
  const { communityId } = req.params;

  const events = await Event.findAll({
    where: { community_id: communityId },
    order: [["date", "ASC"]],
  });

  res.status(200).json(events);
});

// POST /communities/:communityId/events
export const createCommunityEvent = asyncHandler(async (req, res) => {
  const { communityId } = req.params;
  const { title, date, start_time, end_time, description, location, type } =
    req.body;

  if (!title || !date || !start_time || !description || !type) {
    throw new ErrorResponse("Missing required fields", 400);
  }

  const event = await Event.create({
    title,
    date,
    start_time,
    end_time,
    description,
    location,
    type,
    community_id: communityId,
    user_id: req.user.id,
  });

  res.status(201).json(event);
});

// GET /communities/:communityId/events/:id
export const getCommunityEventById = asyncHandler(async (req, res) => {
  const { communityId, id } = req.params;

  const event = await Event.findOne({
    where: {
      id,
      community_id: communityId,
    },
  });

  if (!event) {
    throw new ErrorResponse("Event not found in this community", 404);
  }

  res.status(200).json(event);
});

// PUT /communities/:communityId/events/:id
export const updateCommunityEvent = asyncHandler(async (req, res) => {
  const { communityId, id } = req.params;

  const event = await Event.findOne({
    where: {
      id,
      community_id: communityId,
    },
  });

  if (!event) {
    throw new ErrorResponse("Event not found in this community", 404);
  }

  const { title, date, start_time, end_time, description, location, type } =
    req.body;

  if (title) event.title = title;
  if (date) event.date = date;
  if (start_time) event.start_time = start_time;
  if (end_time !== undefined) event.end_time = end_time;
  if (description) event.description = description;
  if (location !== undefined) event.location = location;
  if (type) event.type = type;

  await event.save();
  res.status(200).json(event);
});

// DELETE /communities/:communityId/events/:id
export const deleteCommunityEvent = asyncHandler(async (req, res) => {
  const { communityId, id } = req.params;

  const event = await Event.findOne({
    where: {
      id,
      community_id: communityId,
    },
  });

  if (!event) {
    throw new ErrorResponse("Event not found in this community", 404);
  }

  await event.destroy();
  res.status(200).json({ message: "Community event deleted successfully." });
});
