import { User } from "../models/index.js"
import { signToken } from "../utils/auth.js"
import {
  AuthenticationError,
  UserInputError,
} from "apollo-server-express"
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import fs from "fs"
import path from "path"
import crypto from "crypto"

import { dateScalar } from "./scalar.js"

const resolvers = {
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      return await User.findById(context.user._id);
    }
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

    fs.mkdirSync(path.join(__dirname, '../client/src/assets/profileUploads'), { recursive: true });

    const f_name = `${id}.${filename.split(".")[1]}`
    const filePath = path.join(
        __dirname,
        '../client/src/assets/profileUploads',
        f_name
      )

    const output = fs.createWriteStream(filePath);

    stream.pipe(output);

    await new Promise(function (resolve, reject) {
      output.on('close', () => {
        console.log('File uploaded');
        resolve();
      });

      output.on('error', (err) => {
        console.log(err);
        reject(err);
      });
    });

    // find user
    const user = await User.findById(id)
    if(user){

      user.profilePhoto = f_name

      const updatedUser = await user.save()

      const token = signToken(updatedUser);

        return { token, user: updatedUser };
      } else {
        throw new AuthenticationError("User not found");
      }

  },
  },
};

export default resolvers;
