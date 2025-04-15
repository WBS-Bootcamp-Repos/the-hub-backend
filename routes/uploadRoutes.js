import { Router } from "express";
import multer from "multer";
import storage from "../config/storage.js";
import { handleUploadProfile } from "../controllers/uploadController.js";
import auth from "../middleware/auth.js";

const upload = multer({ storage });
const uploadRoutes = Router();

uploadRoutes.post(
  "/profile",
  auth,
  upload.single("profile_picture"),
  handleUploadProfile
);

export default uploadRoutes;
