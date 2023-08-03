import bcrypt from "bcrypt"
import {Schema, model} from "mongoose"

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
    },
    scenes: [
      {
        description: {
          type: String,
        },
        options: [{ type: String }],
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

const Story = model("Story", storySchema);

export default Story;
