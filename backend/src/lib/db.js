// Import mongoose for MongoDB connection
import mongoose from "mongoose";

// Function to connect to MongoDB database using Mongoose
export const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB instance using the connection string stored in environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, print a success message with the host address of the DB
    console.log(`ts works mongodb ${conn.connection.host}`);
  } catch (error) {
    // If any error occurs during connection, print error message in console for debugging
    console.log(`fuck ts${error}`);
  }
};
