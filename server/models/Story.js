const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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

module.exports = Story;
