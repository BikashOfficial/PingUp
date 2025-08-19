import mongoose from "mongoose";
import { type } from "os";

const storySchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    content: { type: String },
    media_url: [{ type: String }],
    media_type: {
      type: String,
      enum: ["text", "image", "video"],
    },
    view_count: [{ type: String, ref: "User" }],
    background_color: { type: String },
    font: { type: String },
    textSize: { type: String },
    isBold: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
