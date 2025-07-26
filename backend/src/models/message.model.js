// Import mongoose to define schema and model for MongoDB
import mongoose from "mongoose";

// Define the schema for messages in your chat app
const messageSchema = new mongoose.Schema(
  {
    // 'senderId' stores ObjectId of the user who sent the message
    senderId: {
      type: mongoose.Schema.Types.ObjectId,  // Data type is ObjectId for referencing User documents
      ref: "User",                           // Refers to the User model (for population if needed)
      required: true                         // This field must be provided for every message
    },

    // 'receiverId' stores ObjectId of the user who receives the message
    receiverId: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId type linked to User model
      ref: "User",                          // Reference to the User model
      required: true                       // Required field
    },

    // 'text' stores the textual content of the message (optional if image is present)
    text: {
      type: String                          // String type to hold message text
    },

    // 'image' allows storing a URL or base64 string for an image attached in the message
    image: {
      type: String                          // String type for image URL or data
    }
  },
  {
    // Automatically adds 'createdAt' and 'updatedAt' timestamps to each message document
    timestamps: true 
  }
);

// Create a Mongoose model named "Message" based on this schema
// This model lets you create, read, update, and delete messages in the 'messages' collection in MongoDB
const Message = mongoose.model("Message", messageSchema);

// Export the Message model so other parts of your backend can use it for database operations
export default Message;
