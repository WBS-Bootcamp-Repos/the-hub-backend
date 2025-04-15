import models from "../models/index.js";

export const checkMembership = async (req, res, next) => {
  const communityId = req.params.communityId || req.params.id;
  const { UserCommunity } = models;

  try {
    const membership = await UserCommunity.findOne({
      where: {
        user_id: req.user.id,
        community_id: communityId,
      },
    });

    if (!membership) {
      return res
        .status(403)
        .json({ message: "Access denied: not a community member." });
    }

    // Attach membership details to the request object
    req.userCommunityRole = membership.role;

    next();
  } catch (error) {
    console.error("Error in checkMembership middleware:", error);
    res
      .status(500)
      .json({ message: "Server error during community access check." });
  }
};
