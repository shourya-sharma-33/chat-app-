// --------------------Importing express--------------------

// We need express here to use Router() which helps us create modular route handlers.
import express from "express";


// --------------------Importing Controller Functions & Middleware--------------------

// From auth.controller.js file, we import functions that contain the actual logic to handle auth requests.
// - signup: to register a new user
// - login: to authenticate existing user
// - logout: to log out the user
// - updateProfile: to update user profile information
// - checkAuth: to verify if a user is authenticated (logged in)
// These are separated in controller file for better organization and reusability.

// From middleware/auth.middleware.js, we import "protectRoute",
// which is middleware that protects routes from being accessed without proper authentication.
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


// --------------------Create a router instance--------------------

// We create a router instance from express.Router().
// This router allows us to define routes in this dedicated file,
// and these routes will be imported and used in the main app (index.js).
const router = express.Router();


// --------------------Route Definitions--------------------

/* 
    We define routes here, which mean when a request comes to the backend with these URL paths,
    these specified controller functions will run.

    Example:
    POST /signup -> signup function will run here
    POST /login -> login function will run here
*/

// --- Commented out simple GET routes ---

// Earlier, you had simple GET routes returning a string for signup, login, logout pages as placeholders.
// But these are commented out because it’s a better practice to have the logic in controllers,
// and usually frontend handles the actual pages.

/*
router.get("/signup", (req, res) => {
    res.send("signup page");
});

router.get("/login", (req, res) => {
    res.send("login page");
});

router.get("/logout", (req, res) => {
    res.send("log out page");
});
*/

// ----------------------Main Routes with Controller Functions--------------------

// POST request to /signup : Calls the signup controller function that handles new user registration.
router.post("/signup", signup);

// POST request to /login : Calls the login controller function that authenticates the user.
router.post("/login", login);

// POST request to /logout : Calls the logout controller to log the user out.
router.post("/logout", logout);


// PUT request to /update-profile : This route allows updating user profile.
// protectRoute middleware runs first to ensure only authenticated users can update their profile.
// If user is authenticated, updateProfile controller runs.
router.put("/update-profile", protectRoute, updateProfile);


// GET request to /check : This route checks if user is authenticated by using protectRoute middleware.
// If passed, checkAuth controller returns relevant data (like user info or confirmation).
router.get("/check", protectRoute, checkAuth);


// ----------------------Export Router--------------------

// After defining routes, we export this router to be used in main server file (index.js),
// where you do: app.use("/api/auth", authRoute);
export default router;
