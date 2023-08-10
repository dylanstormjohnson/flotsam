const bcrypt =  require("bcrypt");
const {Schema, model} =  require("mongoose");

const storyOptionSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => Types.ObjectId(),
    },
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
    id: false,
  }
);

const StoryOption = model("StoryOption", storyOptionSchema);

module.exports = StoryOption;
