import {
  User,
  Story,
  PlayedStory,
  StorySlide,
  StoryOption,
} from "../models/index.js";

import { signToken } from "../utils/auth.js";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import fs from "fs";
import path from "path";
import crypto from "crypto";

import { dateScalar } from "./scalar.js";

const resolvers = {
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      return await User.findById(context.user._id);
    },

    allStories: async () => {
      try {
        const allStories = await Story.find();
        return allStories;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch all stories");
      }
    },

    story: async (_, { id }) => {
      try {
        const story = await Story.findById(id);
        return story;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch the story");
      }
    },

    allStorySlides: async () => {
      try {
        const allStorySlides = await StorySlide.find();

        return allStorySlides;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch all story slides");
      }
    },

    storySlide: async (_, { id }) => {
      try {
        const storySlide = await StorySlide.findById(id);
        return storySlide;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch the story slide");
      }
    },

    allStoryOptions: async () => {
      try {
        const allStoryOptions = await StoryOption.find();

        return allStoryOptions;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch all story options");
      }
    },

    storyOption: async (_, { id }) => {
      try {
        const objectId = ObjectId(id);

        const storyOption = await StoryOption.findById(objectId);

        if (storyOption.nextStorySlide) {
          const nextStorySlideId = storyOption.nextStorySlide.toString();
          const nextStorySlide = await StorySlide.findById(nextStorySlideId);
          storyOption.nextStorySlide = nextStorySlide;
        }

        return storyOption;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch the story option");
      }
    },
  },

  StorySlide: {
    options: async (parent) => {
      const optionIds = parent.options;
      const options = await StoryOption.find({ _id: { $in: optionIds } });
      return options.map((option) => ({
        _id: option._id,
        text: option.text,
        nextStorySlide: option.nextStorySlide,
      }));
    },
  },

  Mutation: {
    addUser: async (parent, argObj) => {
      try {
        const user = await User.create(argObj);

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw new UserInputError("Email already exists");
      }
    },

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, { id, firstName, lastName, bio, password }) => {
      const user = await User.findById(id);

      if (user) {
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (bio) user.bio = bio;
        if (password) user.password = password;

        const updatedUser = await user.save();

        const token = signToken(updatedUser);

        return { token, user: updatedUser };
      } else {
        throw new AuthenticationError("User not found");
      }
    },
   singleUpload: async function (parent, { file, id }) {
    const { createReadStream, filename, encoding, mimetype } = await file;
    const stream = createReadStream();
    const __dirname = path.resolve();
    const dirPath = '../client/src/assets/profileUploads'

      fs.mkdirSync(path.join(__dirname, dirPath), { recursive: true });

      const f_name = `${id}.${filename.split(".")[1]}`;
      const filePath = path.join(__dirname, dirPath, f_name);

      // default directory is the current directory

  // get all file names in directory
  fs.readdir(path.resolve(dirPath), (err, fileNames) => {
    if (err) throw err;

    // iterate through the found file names
    for (const name of fileNames) {

      // if file name matches the pattern
      if (pattern.test(name)) {

        // try to remove the file and log the result
        fs.unlink(path.resolve(name), (err) => {
          if (err) throw err;
          console.log(`Deleted ${name}`);
        });
      }
    }
  });

      const output = fs.createWriteStream(filePath);

      stream.pipe(output);

      await new Promise(function (resolve, reject) {
        output.on("close", () => {
          console.log("File uploaded");
          resolve();
        });

        output.on("error", (err) => {
          console.log(err);
          reject(err);
        });
      });

      // find user
      const user = await User.findById(id);
      if (user) {
        user.profilePhoto = f_name;

        const updatedUser = await user.save();

        const token = signToken(updatedUser);

        return { token, user: updatedUser };
      } else {
        throw new AuthenticationError("User not found");
      }
    },
  },
};

export default resolvers;
