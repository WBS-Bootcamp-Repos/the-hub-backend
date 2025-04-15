import models from "../models/index.js";
const { List, ListItem } = models;

// GET /list-items: Fetch all list items
export const getListItems = async (req, res) => {
  const { list_id } = req.params;

  try {
    const list = await List.findByPk(list_id);
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    const listItems = await ListItem.findAll({
      where: { list_id },
    });

    res.status(200).json(listItems);
  } catch (error) {
    console.error("Error fetching list items:", error);
    res.status(500).json({ message: "Failed to fetch list items." });
  }
};

// POST /list-items: Create a new list item
export const createListItem = async (req, res) => {
  const { listId } = req.params;
  const { name, is_completed } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required.",
    });
  }

  try {
    const listItem = await ListItem.create({
      list_id: listId,
      name,
      is_completed: is_completed ?? false,
    });

    res.status(201).json(listItem);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }

    console.error("Error creating list item:", error);
    res.status(500).json({
      message: "Error creating list item",
      error: error.message,
    });
  }
};

// GET /list-items/:id: Fetch a specific list item by ID
export const getListItemById = async (req, res) => {
  const { listId, itemId } = req.params;

  try {
    const listItem = await ListItem.findOne({
      where: {
        id: itemId,
        list_id: listId,
      },
    });

    if (!listItem) {
      return res.status(404).json({ message: "List item not found." });
    }

    res.status(200).json(listItem);
  } catch (error) {
    console.error("Error fetching list item:", error);
    res.status(500).json({ message: "Failed to fetch list item." });
  }
};

// PUT /list-items/:id: Update list item details
export const updateListItem = async (req, res) => {
  const { listId, itemId } = req.params;
  const { name, is_completed } = req.body;

  if (!name && is_completed === undefined) {
    return res.status(400).json({
      message: "At least one field (name or is_completed) must be provided.",
    });
  }

  try {
    const listItem = await ListItem.findOne({
      where: {
        id: itemId,
        list_id: listId,
      },
    });

    if (!listItem) {
      return res.status(404).json({ message: "List item not found." });
    }

    if (name) listItem.name = name;
    if (is_completed !== undefined) listItem.is_completed = is_completed;

    await listItem.update({
      ...(name !== undefined && { name }),
      ...(is_completed !== undefined && { is_completed }),
    });

    res.status(200).json(listItem);
  } catch (error) {
    console.error("Error updating list item:", error);
    res.status(500).json({ message: "Failed to update list item." });
  }
};

// DELETE /list-items/:id: Delete a specific list item by ID
export const deleteListItem = async (req, res) => {
  const { listId, itemId } = req.params;

  try {
    const listItem = await ListItem.findOne({
      where: {
        id: itemId,
        list_id: listId,
      },
    });

    if (!listItem) {
      return res.status(404).json({ message: "List item not found." });
    }

    await listItem.destroy();

    res.status(200).json({ message: "Item deleted." });
  } catch (error) {
    console.error("Error deleting list item:", error);
    res.status(500).json({ message: "Failed to delete list item." });
  }
};
