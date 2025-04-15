import models from "../models/index.js";
const { Message, User } = models;

export const getMessageById = async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findByPk(messageId, {
      include: {
        model: User,
        attributes: ["id", "username", "profile_picture"],
      },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addMessage = async (req, res, next) => {
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ error: "user_id and content are required" });
  }

  if (req.body.community_id) {
    return next(
      new ErrorResponse("Use community routes for community messages", 400)
    );
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newMessage = await Message.create({
      user_id,
      content,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: {
        model: User,
        attributes: ["id", "username", "profile_picture"],
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
