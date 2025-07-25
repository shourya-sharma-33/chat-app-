// ------------------------Import mongoose-----------------------

// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
// It helps you define schemas for your data and interact with the database easily.
import mongoose from "mongoose";

// ------------------------Define a user schema-----------------------

// Creating a schema describes the structure of the data in your MongoDB collection.
// Here, you are defining a "userSchema" with the following fields:

const userSchema = new mongoose.Schema(
  {
    // email field
    email: {
      type: String,       // Data type is String
      required: true,     // Mandatory field, the user must provide email
      unique: true,       // Each email must be unique in the collection
    },

    // fullName field
    fullName: {
      type: String,       // Data type is String
      required: true,     // Mandatory field, user must provide their full name
    },

    // password field
    password: {
      type: String,       // Data type is String
      required: true,     // Mandatory field, user must provide a password
      minLength: 6,       // Password should be at least 6 characters long
    },

    // profilePic field
    profilePic: {
      type: String,       // Data type is String (for URL or base64 string usually)
      default: "",        // Default value is empty string if no profile picture is given
    },
  },
  {
    // Options object passed to schema

    timestamps: true,      // Automatically add 'createdAt' and 'updatedAt' fields
  }
);

// --------------------Create a Mongoose Model--------------------

// A model is a class with which we construct documents.
// In this case, the model is named "User" and it uses the "userSchema" schema.
// This "User" model will be used to create, read, update, delete user documents in the MongoDB "users" collection.
const User = mongoose.model("User", userSchema);

// --------------------Export the model--------------------

// So you can import and use this User model in other files to interact with the database.
export default User;
