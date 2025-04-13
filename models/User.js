const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate usernames
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // You can add more fields later like email, role, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
