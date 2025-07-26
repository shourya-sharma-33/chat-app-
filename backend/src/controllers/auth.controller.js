// Import cloudinary instance for image uploads
import cloudinary from "../lib/cloudinary.js";

// Import the utility function to generate JWT token and set cookie
import { generateToken } from "../lib/utils.js";

// Import User model to interact with users collection in database
import User from "../models/user.model.js";

// Import bcryptjs to hash and compare passwords securely
import bcrypt from "bcryptjs";


// Signup controller - handles new user registration
export const signup = async (req, res) => {
  // Extract fullName, email, and password from request body
  const { fullName, email, password } = req.body;

  try {
    // Validate all fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "all fields are required babygirl" });
    }

    // Validate password length >= 6 characters
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    // Check if a user with this email already exists in DB
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "email already exists" });

    // Generate a salt (random data) for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the plain password using the salt for security
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with hashed password and provided info
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // If newUser instance is valid
    if (newUser) {
      // Generate JWT token and set it as cookie in response
      generateToken(newUser._id, res);

      // Save the new user document to database
      await newUser.save();

      // Respond with user info (excluding password)
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      // If newUser creation failed, respond with error
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    // Log error and return internal server error status
    console.log("error is signup controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};


// Login controller - handles existing user login
export const login = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Check if user with this email exists in DB
    const user = await User.findOne({ email });

    // If no user found, send invalid credentials error
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // Compare provided password with hashed password stored in DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password doesn't match, send invalid credentials error
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // Generate JWT token and set it as cookie in response
    generateToken(user._id, res);

    // Respond with user info (excluding password)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // Log error and return internal server error status
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};


// Logout controller - clears the JWT cookie to log user out
export const logout = (req, res) => {
  try {
    // Clear the jwt cookie by setting it to empty string and expired maxAge
    res.cookie("jwt", "", { maxAge: 0 });

    // Send success message
    res.status(200).json({ message: "logged out successful" });
  } catch (error) {
    // Log error and return internal server error status
    console.log("error in logout controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};


// Update profile controller - updates user's profile picture
export const updateProfile = async (req, res) => {
  try {
    // Extract profilePic string (base64 or image URL) from request body
    const { profilePic } = req.body;

    // Get userId from authenticated request's user object (set by protectRoute middleware)
    const userId = req.user._id;

    // Validate profilePic is provided
    if (!profilePic) {
      return res.status(400).json({ message: "profile pic is required" });
    }

    // Upload profile picture image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Update user document's profilePic field with Cloudinary secure URL and return updated document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true } // return updated document rather than original
    );

    // Send updated user document as response
    res.status(200).json(updatedUser);
  } catch (error) {
    // Log error and return internal server error status
    console.log("ts sucks", error);
    res.status(500).json({ message: "internal server error" });
  }
};


// Check authentication status controller - returns logged-in user's info
export const checkAuth = (req, res) => {
  try {
    // req.user is attached by protectRoute middleware if token is valid
    res.status(200).json(req.user);
  } catch (error) {
    // Log error and return internal server error status
    console.log("error in checkauth controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
