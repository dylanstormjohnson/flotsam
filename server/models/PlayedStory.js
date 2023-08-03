import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const playedStorySchema = new Schema(
  {
    story: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    endings: [
      {
        type: Schema.Types.ObjectId,
        ref: "StorySlide",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const PlayedStory = model("PlayedStory", playedStorySchema);

export default PlayedStory;
