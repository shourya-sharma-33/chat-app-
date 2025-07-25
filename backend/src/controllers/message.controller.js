import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";

// Get users for sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get messages between logged-in user and specified user
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Send a message with optional image upload
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ error: "Invalid receiver ID" });
        }

        if (!text && !image) {
            return res.status(400).json({ error: "Message text or image is required" });
        }

        let imageUrl = null;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text: text || "",
            image: imageUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
