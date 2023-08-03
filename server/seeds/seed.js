import db from "../config/connection.js"
import { User } from "../models/index.js"

import userData from "./userData.json"

db.once("open", async () => {
  // clean database
  await User.deleteMany({});

  // bulk create each model
  await User.insertMany(userData);

  console.log("all done!");
  process.exit(0);
});
