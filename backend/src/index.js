// -----------Importing Required Packages and Setting Up Express---------

// To create a backend server, we use Express.js, a popular Node.js framework.
// Here, we import the 'express' package to use it in our app.
import express from "express";

// We create an instance of Express and store it in a constant called 'app'.
// This 'app' will be used to define routes and middleware.
const app = express();

// ------------------------------------
// Important note about "type": "module" in package.json:
//
// In Node.js, by default, we use require() to import packages. But here, you are using import ... from.
// This is called ES Module syntax.
// To enable that, you need to tell Node.js to treat your code as ES Modules instead of CommonJS.
// This is done by adding this line in your package.json:
// "type": "module"
//
// Without this, your code will throw errors because Node.js expects require() syntax by default.
//
// Also, you cannot add comments in JSON files like package.json, 
// so be careful while editing it.
//
// ------------------------------------

// To avoid running your app manually every time or typing a long command like:
// npx nodemon index.js
// You can add a script in package.json under "scripts":
// "dev": "nodemon index.js"
//
// Then you simply run:
// npm run dev
// This uses nodemon for automatic restarts on file changes.

// ----------Port and Middleware Setup-------------

// We import 'cookie-parser' that helps us parse cookies from incoming requests.
// Cookies are small pieces of data stored on the client side and sent with requests.
import cookieParser from "cookie-parser";
import cors from "cors";

// dotenv is a package that loads environment variables from a .env file into process.env
// We call dotenv.config() so we can use environment variables like PORT.
import dotenv from "dotenv";
dotenv.config();

// We get the PORT value from environment variable file .env
const PORT = process.env.PORT;

// express.json() is built-in middleware that parses incoming JSON request bodies,
// so you can access req.body as a JavaScript object.
app.use(express.json());

// We tell our app to use cookie-parser middleware for handling cookies.
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials : true
}))
 
// ---------------------Database Connection Import------------------------

// Here, you import the function that connects your backend to a database.
// Your database connection logic is in './lib/db.js'
// We'll call this later once the server starts.
import { connectDB } from "./lib/db.js";

// --------------------Route Imports---------------------------

// Routes are like different URL endpoints your backend responds to.
// For your authentication-related routes (login, signup, etc.) you've made a separate file.
// You import it here as 'authRoute'.
import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// -------------------Use Routes in the App--------------------

// Now we tell express that for any request starting with "/api/auth",
// use the routes defined in authRoute file for handling those requests.
app.use("/api/auth", authRoute);

// -------------------Home Route (testing purpose)---------------

// We define a simple GET request for the root URL "/"
// When anyone hits your server's root, it will respond with "app running".
app.get("/", (req, res) => {
  res.send("app running");
});

// ------------------Start The Server and Connect To DB-----------------------

// app.listen starts the server on the port retrieved from .env file
// The callback function runs after the server successfully starts listening.
// We print "server running" to the console here as confirmation.
// After server starts, connectDB() is called to establish database connection.
app.listen(PORT, () => {
  console.log("server running"); 
  connectDB();
});
