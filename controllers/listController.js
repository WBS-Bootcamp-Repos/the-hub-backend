import models from "../models/index.js";
const { List, User, ListItem } = models;

// GET /lists: Fetch all lists
export const getLists = async (req, res) => {
  try {
    const lists = await List.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
        },
        {
          model: ListItem,
        },
      ],
    });

    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: "Failed to fetch lists." });
  }
};

// GET /api/lists?user_id=123
export const getListsPerUserId = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const lists = await List.findAll({
      where: { user_id, privacy: "Private" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id"],
        },
        {
          model: ListItem,
        },
      ],
    });
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: "Failed to fetch lists." });
  }
};

// POST /lists: Create a new list
export const createList = async (req, res) => {
  const { user_id, title, category, privacy, community_id } = req.body;

  if (!user_id || !title || !category || !privacy) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const list = await List.create({
      user_id,
      title,
      category,
      privacy,
      community_id,
    });

    res.status(201).json(list);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ message: "Error creating list." });
  }
};

// GET /lists/:id: Fetch a specific list by ID
export const getListById = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findByPk(id, {
      include: [
        {
          model: ListItem,
        },
      ],
    });

    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ message: "Failed to fetch list." });
  }
};

// PUT /lists/:id: Update a specific list by ID
export const updateList = async (req, res) => {
  const { id } = req.params;
  const { title, category, privacy } = req.body;

  if (!title && !category && !privacy) {
    return res
      .status(400)
      .json({ message: "At least one field is required for update." });
  }

  try {
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    if (title) list.title = title;
    if (category) list.category = category;
    if (privacy) list.privacy = privacy;

    await list.save();

    res.status(200).json(list);
  } catch (error) {
    console.error("Error updating list:", error);
    res.status(500).json({ message: "Failed to update list." });
  }
};

// DELETE /lists/:id: Delete a specific list by ID
export const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    await list.destroy();
    res.status(200).json({ message: "List deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete list." });
  }
};
