// Import jsonwebtoken package for token verification and decoding
import jwt, { decode } from "jsonwebtoken";

// Import User model to query the database
import User from "../models/user.model.js";

// Middleware to protect routes: only allow access if user is authenticated
export const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies sent with the request (cookie named 'jwt')
    const token = req.cookies.jwt;

    // If token is not present, user is not authenticated
    if (!token) {
      // Send 401 Unauthorized response with a message
      return res.status(401).json({ message: "unauthorized, no token provided" });
    }

    // Verify the token using the secret key (process.env.JWT_SECRET)
    // This checks validity and returns the decoded payload if successful
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token verification fails and decoded object is falsy
    if (!decoded) {
      // Send 401 Unauthorized with an invalid token message
      return res.status(401).json({ message: "unauthorized, invalid token" });
    }

    // Use the userId from decoded token payload to find user in database
    // .select("-password") excludes the password field from the returned user object for security
    const user = await User.findById(decoded.userId).select("-password");

    // If no user is found matching the decoded userId
    if (!user) {
      // Send 400 Bad Request indicating user not found
      return res.status(400).json({ message: "user not found" });
    }

    // Attach the found user object to req.user so next middlewares/routes can access it
    req.user = user;

    // Call next() to pass control to the next middleware or route handler
    next();

  } catch (error) {
    // Log any unexpected errors for debugging
    console.log(error.message);

    // Send 500 Internal Server Error response for any server-side error
    res.status(500).json({ message: "internal error" });
  }
};
