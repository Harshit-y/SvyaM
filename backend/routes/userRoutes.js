import express from "express";
import User from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please provide all the fields" });

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
    });
    if (user) {
      // Log the user in immediately
      generateTokenAndSetCookie(res, user._id, user.role);

      // Send user data back
      res.status(201).json({
        _id: user._id,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Auth user (login) & get token
// @route   POST /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });

    if (user) {
      // 2. Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // 3. User is valid! Generate token and set cookie
        generateTokenAndSetCookie(res, user._id, user.role);

        // 4. Send user data back to the frontend
        res.status(200).json({
          _id: user._id,
          email: user.email,
          role: user.role,
        });
      } else {
        // Password doesn't match
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      // User doesn't exist
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
