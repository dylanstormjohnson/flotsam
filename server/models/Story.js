import bcrypt from "bcrypt"
import {Schema, model, Types } from "mongoose"

const storySchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => Types.ObjectId()
    },
    name: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
    numberOfPossibleEndings: {
      type: Number,
      required: true,
    },
    firstStorySlide: {
      type: Schema.Types.ObjectId,
      ref: "StorySlide",
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
    id: false
  }
);

const Story = model("Story", storySchema);

export default Story;
