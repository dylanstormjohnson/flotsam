const db =  require("../config/connection.js")
const { User, Story, StorySlide, StoryOption } =  require("../models/index.js")

const userData =  require("./userData.json")
const storyData =  require("./storyData.json")
const storySlideData =  require("./storySlideData.json")
const storyOptionData =  require("./storyOptionData.json")

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
