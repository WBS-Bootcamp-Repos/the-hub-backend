import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import models from "../models/index.js";
const { Event, User } = models;

export const getEvents = asyncHandler(async (req, res) => {
  // console.log("A GET request is made to get all the Events");

  if (!req.user || !req.user.id) {
    throw new ErrorResponse("Not authorized - no user data found", 401);
  }

  const user = await User.findByPk(req.user.id);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  const events = await Event.findAll({
    where: {
      user_id: req.user.id,
      type: "Private",
    },
  });
  res.status(200).json(events);
});

export const createEvent = asyncHandler(async (req, res) => {
  // console.log("A POST request is made to add a new Event");

  if (!req.user || !req.user.id) {
    throw new ErrorResponse("Not authorized - no user data found", 401);
  }

  const {
    title,
    date,
    start_time,
    end_time,
    description,
    location,
    type,
    community_id,
  } = req.body;

  if (!title || !date || !start_time || !description || !type) {
    return res.status(400).json({
      message: "Title, date, start_time, description, and type are required",
    });
  }

  const event = await Event.create({
    title,
    date,
    start_time,
    end_time,
    description,
    location,
    type,
    community_id,
    user_id: req.user.id,
  });

  return res.status(201).json(event);
});

export const getEventById = asyncHandler(async (req, res) => {
  // console.log("A GET request is made to get a SINGLE Event by ID");

  const { id } = req.params;
  const event = await Event.findByPk(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  res.status(200).json(event);
});

export const updateEvent = asyncHandler(async (req, res) => {
  // console.log("A PUT request is made to update an Event");

  const { id } = req.params;
  const { title, date, start_time, end_time, description, location, type } =
    req.body;

  if (!req.user || !req.user.id) {
    throw new ErrorResponse("Not authorized - no user data found", 401);
  }

  const event = await Event.findByPk(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  if (event.user_id !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Forbidden: Cannot edit this event" });
  }

  if (title) event.title = title;
  if (date) event.date = date;
  if (start_time) event.start_time = start_time;
  if (end_time) event.end_time = end_time;
  if (description) event.description = description;
  if (location) event.location = location;
  if (type) event.type = type;

  await event.save();
  res.status(200).json(event);
});

export const deleteEvent = asyncHandler(async (req, res) => {
  // console.log("A DELETE request is made to delete an Event");

  const { id } = req.params;

  if (!req.user || !req.user.id) {
    throw new ErrorResponse("Not authorized - no user data found", 401);
  }

  const event = await Event.findByPk(id);

  if (!event) {
    throw new ErrorResponse(`Event with id ${id} not found`, 404);
  }

  if (event.user_id !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Forbidden: Cannot delete this event" });
  }

  await event.destroy();
  res.status(200).json({ message: "Event deleted successfully." });
});
