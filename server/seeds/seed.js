import db from "../config/connection.js";
import { User, Story, StorySlide, StoryOption } from "../models/index.js";

import userData from "./userData.json" assert { type: "json" };
import storyData from "./storyData.json" assert { type: "json" };
import storySlideData from "./storySlideData.json" assert { type: "json" };
import storyOptionData from "./storyOptionData.json" assert { type: "json" };

db.once("open", async () => {
  // clean database
  await User.deleteMany({});
  await Story.deleteMany({});
  await StorySlide.deleteMany({});
  await StoryOption.deleteMany({});

  // bulk create each model
  //await User.insertMany(userData);
  await Story.insertMany(storyData);
  await StorySlide.insertMany(storySlideData);
  await StoryOption.insertMany(storyOptionData);

  console.log("all done!");
  process.exit(0);
});
