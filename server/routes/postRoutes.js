import express from "express";
import { protect } from "../middleware/auth";
import { addPost, getFeedPosts, likePost } from "../controllers/postController";
import { upload } from "../config/multer";

const postRouter = express.Router();

postRouter.post("/add", upload.array("image", 4), protect, addPost);
postRouter.get("/feed", protect, getFeedPosts);
postRouter.post("/like", protect, likePost);

export default postRouter;
