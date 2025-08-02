import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();


const PORT = process.env.PORT;


// We tell our app to use cookie-parser middleware for handling cookies.
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials : true
}))
app.use(express.json({ limit: '10mb' })); // or another appropriate size

// ---------------------Database Connection Import------------------------

// Here, you import the function that connects your backend to a database.
// Your database connection logic is in './lib/db.js'
// We'll call this later once the server starts.

// --------------------Route Imports---------------------------

// Routes are like different URL endpoints your backend responds to.
// For your authentication-related routes (login, signup, etc.) you've made a separate file.
// You import it here as 'authRoute'.

// -------------------Use Routes in the App--------------------

// Now we tell express that for any request starting with "/api/auth",
// use the routes defined in authRoute file for handling those requests.
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoutes);

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
