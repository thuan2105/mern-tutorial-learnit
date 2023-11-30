const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../Models/User");

class AuthController {
  constructor() {
    this.register = this.register.bind(this);
  }

  // @router GET api/auth
  // @desc Check if user is logged in
  // @access Public
  async user(req, res) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  }

  // @router POST api/auth/register
  // @desc Register user
  // @access Public
  async register(req, res) {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });
    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "User name already taken" });
      // All good
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @router POST api/auth/login
  // @desc Login user
  // @access Public
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });
    try {
      // Check for existing user
      const user = await User.findOne({ username });

      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });
      // Username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });
      // All good
      // Return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "User login successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
}

module.exports = new AuthController();
