import models from "../models/index.js";
import communitySchema from "../schemas/communitySchema.js";
import asyncHandler from "../utils/asyncHandler.js";
const { Community, UserCommunity } = models;

// GET /communities: Fetch all communities
export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch communities." });
  }
};

// POST /communities: Create a new community
export const createCommunity = async (req, res, next) => {
  const { error, value } = communitySchema.POST.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const { name } = value;

  try {
    const community = await Community.create({ name });

    // Add creator as admin
    await UserCommunity.create({
      user_id: req.user.id,
      community_id: community.id,
      role: "admin",
    });

    res.status(201).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating community." });
  }
};

// GET /communities/my: Fetch communities the user is part of
export const getMyCommunities = async (req, res) => {
  try {
    const user = await models.User.findByPk(req.user.id, {
      include: {
        model: models.Community,
        through: { attributes: ["role"] },
      },
    });

    const communities = user.Communities.map((c) => ({
      id: c.id,
      name: c.name,
      role: c.UserCommunity.role,
    }));

    res.status(200).json(communities);
  } catch (err) {
    console.error("Error loading user communities:", err);
    res.status(500).json({ message: "Failed to load communities." });
  }
};

// POST /communities/:id/join: Join a community
export const joinCommunity = async (req, res) => {
  const communityId = req.params.id;

  try {
    const existing = await UserCommunity.findOne({
      where: {
        user_id: req.user.id,
        community_id: communityId,
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Already a member." });
    }

    await UserCommunity.create({
      user_id: req.user.id,
      community_id: communityId,
      role: "member",
    });

    res.status(200).json({ message: "Joined successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to join community." });
  }
};

// GET /communities/:id: Fetch a specific community by ID
export const getCommunityById = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findByPk(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }
    res.status(200).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch community." });
  }
};

// PUT /communities/:id: Update a specific community by ID
export const updateCommunity = async (req, res, next) => {
  const { error, value } = communitySchema.PUT.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const { id } = req.params;

  try {
    const community = await Community.findByPk(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    if (value.name) {
      community.name = value.name;
      await community.save();
    }

    res.status(200).json(community);
  } catch (error) {
    console.error("Error updating community:", error);
    res.status(500).json({ message: "Failed to update community." });
  }
};

// DELETE /communities/:id: Delete a specific community by ID
export const deleteCommunity = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findByPk(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    await community.destroy();
    res.status(200).json({ message: "Community deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete community." });
  }
};

// GET /communities/:id/settings
export const getCommunitySettings = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const community = await Community.findByPk(id);

  if (!community) {
    return next(new ErrorResponse("Community not found", 404));
  }

  res.status(200).json(community.settings);
});

// PUT /communities/:id/settings
export const updateCommunitySettings = asyncHandler(async (req, res, next) => {
  const { error } = communitySchema.SETTINGS_UPDATE.validate(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const { id } = req.params;
  const community = await Community.findByPk(id);

  if (!community) {
    return next(new ErrorResponse("Community not found", 404));
  }

  community.settings = req.body.settings;
  await community.save();

  res
    .status(200)
    .json({ message: "Settings updated", settings: community.settings });
});

export const getCommunityPinBoard = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid community ID" });
  }

  const community = await models.Community.findByPk(id);

  if (!community) {
    return res.status(404).json({ message: "Community not found." });
  }

  res.status(200).json({
    pin_board: community.pin_board || [],
  });
});

export const updateCommunityPinBoard = asyncHandler(async (req, res, next) => {
  const community = await Community.findByPk(req.params.id);
  if (!community) {
    return next(new ErrorResponse("Community not found", 404));
  }

  const requestedPins = req.body.pin_board;

  if (!Array.isArray(requestedPins)) {
    return next(new ErrorResponse("pin_board must be an array", 400));
  }

  const settings = community.settings || {};
  const allowedApps = Object.keys(settings).filter((key) => settings[key]);

  // Check each item (must be object with "type")
  const invalidItems = requestedPins.filter(
    (item) => !item.type || !allowedApps.includes(item.type)
  );

  if (invalidItems.length > 0) {
    return res.status(400).json({
      message: "Some apps are not enabled in community settings.",
      invalid: invalidItems,
    });
  }

  community.pin_board = requestedPins;
  await community.save();

  res.json({ message: "Pinboard updated", pin_board: community.pin_board });
});

// DELETE /communities/:id/leave
export const leaveCommunity = async (req, res) => {
  const communityId = req.params.id;

  try {
    const userCommunity = await UserCommunity.findOne({
      where: {
        user_id: req.user.id,
        community_id: communityId,
      },
    });

    if (!userCommunity) {
      return res
        .status(404)
        .json({ message: "Not a member of this community." });
    }

    // Prevent admin from leaving if they are the last admin
    if (userCommunity.role === "admin") {
      const otherAdmins = await UserCommunity.findAll({
        where: {
          community_id: communityId,
          role: "admin",
          user_id: { [models.Sequelize.Op.ne]: req.user.id },
        },
      });

      if (otherAdmins.length === 0) {
        return res
          .status(400)
          .json({ message: "Cannot leave as the last admin." });
      }
    }

    await userCommunity.destroy();

    res.status(200).json({ message: "Left community successfully." });
  } catch (err) {
    console.error("Error leaving community:", err);
    res.status(500).json({ message: "Failed to leave community." });
  }
};
