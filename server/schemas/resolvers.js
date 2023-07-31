const { User } = require("../models");
const { signToken } = require("../utils/auth");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { dateScalar } = require("./scalar");

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    addUser: async (parent, argObj) => {
      try {
        const user = await User.create(argObj);

        console.log(argObj);

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
        console.log(updatedUser);

        const token = signToken(updatedUser);

        return { token, user: updatedUser };
      } else {
        throw new AuthenticationError("User not found");
      }
    },
    updatePhoto: (parent, args) => {
      console.log(args);
      return "Success";
    },
  },
};

module.exports = resolvers;
