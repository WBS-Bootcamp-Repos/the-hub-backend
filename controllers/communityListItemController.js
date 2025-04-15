import models from "../models/index.js";
const { List, ListItem } = models;

// GET /communities/:communityId/lists/:listId/items
export const getCommunityListItems = async (req, res) => {
  const { communityId, listId } = req.params;

  try {
    const list = await List.findOne({
      where: { id: listId, community_id: communityId },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found in community." });
    }

    const items = await ListItem.findAll({ where: { list_id: list.id } });
    res.json(items);
  } catch (err) {
    console.error("Error fetching list items:", err);
    res.status(500).json({ message: "Failed to fetch items." });
  }
};

// POST /communities/:communityId/lists/:listId/items
export const createCommunityListItem = async (req, res) => {
  const { communityId, listId } = req.params;
  const { name, is_completed } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required." });
  }

  try {
    const list = await List.findOne({
      where: { id: listId, community_id: communityId },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found in community." });
    }

    const item = await ListItem.create({
      list_id: list.id,
      name,
      is_completed: is_completed ?? false,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("Error creating list item:", err);
    res.status(500).json({ message: "Failed to create list item." });
  }
};

// PUT /communities/:communityId/lists/:listId/items/:itemId
export const updateCommunityListItem = async (req, res) => {
  const { communityId, listId, itemId } = req.params;
  const { name, is_completed } = req.body;

  try {
    const list = await List.findOne({
      where: { id: listId, community_id: communityId },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found in community." });
    }

    const item = await ListItem.findOne({
      where: { id: itemId, list_id: list.id },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found in list." });
    }

    if (name !== undefined) item.name = name;
    if (is_completed !== undefined) item.is_completed = is_completed;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ message: "Failed to update list item." });
  }
};

// DELETE /communities/:communityId/lists/:listId/items/:itemId
export const deleteCommunityListItem = async (req, res) => {
  const { communityId, listId, itemId } = req.params;

  try {
    const list = await List.findOne({
      where: { id: listId, community_id: communityId },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found in community." });
    }

    const item = await ListItem.findOne({
      where: { id: itemId, list_id: list.id },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found in list." });
    }

    await item.destroy();
    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Failed to delete item." });
  }
};
