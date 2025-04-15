import models from "../models/index.js";
const { User } = models;

export const handleUploadProfile = async (req, res) => {
  //   console.log("Upload route hit");
  //   console.log("File received:", req.file);
  //   console.log("Body:", req.body);

  const imageUrl = req.file?.path;
  const userId = req.user?.id || req.body.user_id;

  if (!imageUrl || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing image or userId" });
  }

  try {
    const [updatedCount] = await User.update(
      { profile_picture: imageUrl },
      { where: { id: userId } }
    );

    if (updatedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};
