import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";

// Controller to get all users except the logged-in user for the chat sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        // Get the currently logged-in user's ID from the request (set by protectRoute middleware)
        const loggedInUserId = req.user._id;

        // Find all users except the logged-in user by filtering out the current user's ID
        // .select("-password") makes sure not to send password data in the response
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Send the filtered users as JSON response with status 200 (OK)
        res.status(200).json(filteredUsers);
    } catch (error) {
        // Log the error for debugging
        console.error("Error in getUsersForSidebar:", error.message);

        // Send 500 status code for Internal Server Error with an error message
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to get all messages between logged-in user and a specified user
export const getMessage = async (req, res) => {
    try {
        // Extract the ID of the user the logged-in user wants to chat with from the URL parameters
        const { id: userToChatId } = req.params;

        // Get logged-in user ID from the request object
        const myId = req.user._id;

        // Validate that the user ID in URL param is a valid MongoDB ObjectId
        // This prevents invalid database queries and potential errors
        if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Find messages where:
        // - sender is the logged-in user and receiver is the other user, OR
        // - sender is the other user and receiver is the logged-in user
        // This way, you get the full conversation in both directions
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        // Send all found messages as JSON response with status 200 (OK)
        res.status(200).json(messages);
    } catch (error) {
        // Log error and respond with 500 Internal Server Error
        console.error("Error in getMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Controller to send a new message, with optional image upload
export const sendMessage = async (req, res) => {
    try {
        // Extract 'text' and 'image' fields from the request body
        const { text, image } = req.body;

        // Extract receiver ID from URL params, i.e., the user to whom message should be sent
        const { id: receiverId } = req.params;

        // Get the sender (logged-in user) ID from request object
        const senderId = req.user._id;

        // Validate the receiverId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ error: "Invalid receiver ID" });
        }

        // Ensure that either text or image is provided, else reject the request
        if (!text && !image) {
            return res.status(400).json({ error: "Message text or image is required" });
        }

        // Variable to hold the uploaded image URL if an image is provided
        let imageUrl = null;

        if (image) {
            // Upload the image string (could be base64 or URL) to Cloudinary
            // cloudinary.uploader.upload returns an object containing secure_url to the uploaded image
            const uploadResponse = await cloudinary.uploader.upload(image);

            // Store uploaded image's secure URL to be saved in the message document
            imageUrl = uploadResponse.secure_url;
        }

        // Create a new Message document instance with sender, receiver, text, and optional image URL
        const newMessage = new Message({
            senderId,
            receiverId,
            text: text || "",   // if text is absent but image present, store empty string (to avoid undefined)
            image: imageUrl,
        });

        // Save the new message to the database
        await newMessage.save();

        // Respond with the newly created message data and status 201 (Created)
        res.status(201).json(newMessage);
    } catch (error) {
        // Log error and respond with 500 Internal Server Error
        console.error("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
