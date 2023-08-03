import bcrypt from "bcrypt"
import {Schema, model} from "mongoose"

const storySlideSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "StorySlide",
      },
    ],
    endSlide: {
      type: Boolean,
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

const StorySlide = model("StorySlide", storySlideSchema);

export default StorySlide;
