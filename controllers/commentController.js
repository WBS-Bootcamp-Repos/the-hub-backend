import models from "../models/index.js";
import commentSchema from "../schemas/commentSchema.js";
const { Comment, User } = models;

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { content, post_id, user_id } = req.body;

    const { error } = commentSchema.POST.validate({
      content,
      post_id,
      user_id,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    const comment = await Comment.create({ content, post_id, user_id });

    const fullComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "profile_picture"],
        },
      ],
    });

    res.status(201).json(fullComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment" });
  }
};

// Get comments for a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { post_id: postId },
      order: [["created_at", "ASC"]],
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "profile_picture"],
        },
      ],
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Update comment (only if owner)
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = commentSchema.PUT.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this comment" });
    }

    comment.content = req.body.content;
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json({ message: "Error updating comment" });
  }
};

// Delete comment (only if owner)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await comment.destroy();
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
