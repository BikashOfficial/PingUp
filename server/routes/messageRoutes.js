import express from "express";
import {
  getChatMessages,
  sendMessages,
  sseController,
} from "../controllers/messageController";
import { upload } from "../config/multer";
import { protect } from "../middleware/auth";

const messageRouter = express.Router();

messageRouter.get("/:userId", sseController);
messageRouter.post("/send", upload.single("image"), protect, sendMessages);
messageRouter.post("/get", protect, getChatMessages);

export default messageRouter
