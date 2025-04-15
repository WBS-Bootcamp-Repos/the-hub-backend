import models from "../models/index.js";
import jwt from "jsonwebtoken";
const { User, Community } = models;
import bcrypt from "bcryptjs";
import userSchema from "../schemas/userSchema.js";

// GET /users: Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Community,
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// POST /users: Create a new user
export const createUser = async (req, res) => {
  req.body.profile_picture = req.body.profilePicture ?? null;
  console.log("Incoming Signup Body:", req.body);

  // Validate with Joi first
  const { error } = userSchema.POST.validate(req.body);
  if (error) {
    console.error("Joi validation error:", error.details);
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }

  const { username, email, password, profile_picture, community_id } = req.body;
  console.log("Received data:", req.body);
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required.",
    });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      profile_picture: profile_picture ?? null,
      community_id: community_id ?? null,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profile_picture,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors.map((error) => error.message),
      });
    }

    return res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

// GET /users/:id: Fetch a specific user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Community,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Failed to fetch user." });
  }
};

// PUT /users/:id: Update user details for a specific user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, profilePicture, community_id, password } = req.body;

  if (!username && !email && !profilePicture && !community_id && !password) {
    return res.status(400).json({
      message:
        "At least one field (username, email, profilePicture, community_id, password) must be provided for update.",
    });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePicture) user.profile_picture = profilePicture;
    if (community_id !== undefined) user.community_id = community_id;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profile_picture,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ message: "Failed to update user." });
  }
};

// DELETE /users/:id: Delete a specific user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.scope("withPassword").findOne({ where: { email } });

    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password input:", password);
    // console.log("Password input:", user.password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    console.log("Types →", typeof password, typeof user.password);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET /login/me – Get user from token (via middleware `auth`)
export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    profilePicture: req.user.profile_picture,
    communityId: req.user.community_id,
  });
};
