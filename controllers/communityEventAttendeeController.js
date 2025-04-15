import models from "../models/index.js";
const { Event, EventAttendee } = models;

// GET attendees for a community event
export const getCommunityEventAttendees = async (req, res) => {
  const { communityId, eventId } = req.params;

  try {
    const event = await Event.findOne({
      where: { id: eventId, community_id: communityId },
    });

    if (!event) {
      return res.status(404).json({ message: "Community event not found." });
    }

    const attendees = await EventAttendee.findAll({
      where: { event_id: event.id },
    });

    res.status(200).json(attendees);
  } catch (err) {
    console.error("Error fetching attendees:", err);
    res.status(500).json({ message: "Failed to fetch event attendees." });
  }
};

// POST add attendee to community event
export const addCommunityEventAttendee = async (req, res) => {
  const { communityId, eventId } = req.params;
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const event = await Event.findOne({
      where: { id: eventId, community_id: communityId },
    });

    if (!event) {
      return res.status(404).json({ message: "Community event not found." });
    }

    const existing = await EventAttendee.findOne({
      where: { event_id: event.id, user_id },
    });

    if (existing) {
      return res.status(400).json({ message: "User already added." });
    }

    const attendee = await EventAttendee.create({
      event_id: event.id,
      user_id,
    });

    res.status(201).json(attendee);
  } catch (err) {
    console.error("Error adding attendee:", err);
    res.status(500).json({ message: "Failed to add attendee." });
  }
};

// DELETE remove attendee from community event
export const removeCommunityEventAttendee = async (req, res) => {
  const { communityId, eventId, userId } = req.params;

  try {
    const event = await Event.findOne({
      where: { id: eventId, community_id: communityId },
    });

    if (!event) {
      return res.status(404).json({ message: "Community event not found." });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const attendee = await EventAttendee.findOne({
      where: { event_id: event.id, user_id: userId },
    });

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found." });
    }

    await attendee.destroy();
    res.status(200).json({ message: "Attendee removed successfully." });
  } catch (err) {
    console.error("Error removing attendee:", err);
    res.status(500).json({ message: "Failed to remove attendee." });
  }
};
