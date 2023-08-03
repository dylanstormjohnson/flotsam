import bcrypt from "bcrypt"
import {Schema, model} from "mongoose"

const storyOptionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    nextStorySlide: {
      type: Schema.Types.ObjectId,
      ref: "StorySlide",
      required: true,
    },
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

const StoryOption = model("StoryOption", storyOptionSchema);

export default StoryOption;
