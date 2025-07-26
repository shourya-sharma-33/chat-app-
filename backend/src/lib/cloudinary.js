// Import the Cloudinary v2 SDK for uploading and managing media files in Cloudinary
import { v2 as cloudinary } from "cloudinary";

// Import dotenv to read environment variables from the .env file
import dotenv from "dotenv";

// Initialize dotenv configuration to load variables from .env into process.env
dotenv.config();

// Configure Cloudinary with your account credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Your Cloudinary cloud name (account identifier)
  api_key: process.env.CLOUDINARY_API_KEY,        // Your Cloudinary API key (access key)
  api_secret: process.env.CLOUDINARY_API_SECRET,  // Your Cloudinary API secret (keep this private)
});

// Export the configured cloudinary instance to use it in other parts of your app (e.g., uploading images)
export default cloudinary;
