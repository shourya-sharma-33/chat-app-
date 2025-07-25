import jwt from "jsonwebtoken";

// Function to generate a JWT token for a user and set it as a cookie in the response
export const generateToken = (userId, res) => {
  // Create a JWT token, signing it with the user's ID as payload
  // The token is signed using the secret key from environment variables
  // The token will expire in 7 days ("7d")
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the JWT token as an HTTP-only cookie in the response
  // This way, the token will be stored on the client as a cookie automatically
  res.cookie("jwt", token, {
    // Cookie will expire in 7 days (converted to milliseconds)
    maxAge: 7 * 24 * 60 * 60 * 1000,

    // httpOnly means JavaScript on the client cannot access this cookie (for security)
    httpOnly: true,

    // SameSite attribute controls when cookies are sent with cross-site requests
    // 'strict' disallows sending cookie in cross-site contexts (helps prevent CSRF)
    sameSite: "strict",

    // Secure flag ensures the cookie is only sent over HTTPS in production
    // In development (non-production) environment, secure is false, so cookie works on HTTP localhost
    secure: process.env.NODE_ENV !== "development",
  });

  // Finally, return the token string (optional - useful if you want to send it elsewhere too)
  return token;
};
