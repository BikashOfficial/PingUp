import express from "express";
import {
  getChatMessages,
  sendMessages,
  sseController,
} from "../controllers/messageController.js";
import { upload } from "../config/multer.js";
import { protect } from "../middleware/auth.js";

const messageRouter = express.Router();

messageRouter.get("/:userId", sseController);
messageRouter.post("/send", upload.single("image"), protect, sendMessages);
messageRouter.post("/get", protect, getChatMessages);

export default messageRouter
