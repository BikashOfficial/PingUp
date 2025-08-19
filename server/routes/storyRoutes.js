import express from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/multer.js";
import { addUserStory, getUserStory } from "../controllers/storyController.js";

const storyRouter = express.Router();

storyRouter.post("/create", upload.single("media"), protect, addUserStory);
storyRouter.get("/get", protect, getUserStory);

export default storyRouter