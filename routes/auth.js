const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

// Sighup API
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ msg: `User with email ${email} already exists` });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let user = new User({ email, password: hashedPassword, fullName });
      user = await user.save();
      res.json({ user });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Signin API

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // if user is found then entire MongoDb object is in findUser
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ msg: `User ${email} not found` });
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect user id or password. Try again." });
      } else {
        const token = jwt.sign({ id: findUser._id }, "passwordKey");
        const { password, ...userWithoutPassword } = findUser._doc;
        res.json({ token, userWithoutPassword });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.stack });
  }
});

module.exports = authRouter;
