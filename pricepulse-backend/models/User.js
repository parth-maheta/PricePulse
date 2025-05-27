const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true }, // Clerk user ID like "user_2xgLLKNQ0UkUWDLPNvmCDWwYTmO"
  name: { type: String }, // Optional: get from Clerk or user input
  email: { type: String }, // Optional: also from Clerk
  // add other app-specific fields here if needed
});

module.exports = mongoose.model("User", userSchema);
