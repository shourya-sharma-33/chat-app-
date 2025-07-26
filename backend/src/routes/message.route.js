// Import express framework to create a router object for structuring your API endpoints.
import express from "express";

// Import 'protectRoute' middleware to secure routes so only authenticated users can access them.
import { protectRoute } from "../middleware/auth.middleware.js";

// Import your three controller functions for handling message functionality
// - getMessage: to fetch message(s) between users
// - getUsersForSidebar: to get a list of users for the chat sidebar (showing all possible contacts)
// - sendMessage: to send a new chat message
import { getMessage, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
    
// Create a new Express Router object to define routes related to messaging
const router = express.Router();

// ----------- ROUTE DEFINITIONS ------------

// Route to fetch list of users for the sidebar
// - GET request to /users
// - protectRoute middleware: Only logged-in users can access
// - getUsersForSidebar controller gets invoked if user is authenticated
router.get("/users", protectRoute, getUsersForSidebar);

// Route to fetch messages with a specific user
// - GET request to /:id (where 'id' is typically the userId of the other chat participant)
// - protectRoute middleware to check if the requester is authenticated
// - getMessage controller is called to fetch or list chat messages between users
router.get("/:id", protectRoute, getMessage);

// Route to send a new message to a specific user
// - POST request to /send/:id (where 'id' is the receiver's userId)
// - protectRoute to make sure only logged-in users can send messages
// - sendMessage controller handles sending and storing the message
router.post("/send/:id", protectRoute, sendMessage);

// Export this messaging router to be used and mounted by your main Express app
export default router;
