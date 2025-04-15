import models from "../models/index.js";

export const requireAdmin = async (req, res, next) => {
  const communityId = req.params.communityId || req.params.id;
  const { UserCommunity } = models;

  try {
    const membership = await UserCommunity.findOne({
      where: {
        user_id: req.user.id,
        community_id: communityId,
      },
    });

    if (!membership || membership.role !== "admin") {
      return res.status(403).json({ message: "Admin rights required." });
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin middleware:", error);
    res.status(500).json({ message: "Server error during role check." });
  }
};
