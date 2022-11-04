const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { generateRandomString } = require("../utils/generateRandomString");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.generateToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN);

  user.tokens.push({ token });

  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email or password");
  }

  return user;
};

userSchema.statics.verfiy = async function (email, verfiedToken) {
  const user = await User.findOne({ email });

  const isRightToken = user.tokens.find((token) => {
    return token.token === verfiedToken;
  });

  if (isRightToken) {
    user.isVerified = true;
  } else {
    throw new Error("verfiy failed");
  }

  user.save();

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
