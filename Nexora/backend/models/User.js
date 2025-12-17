const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // This is for Profile update
    mobile: {
      type: String,
      unique: true,
    },
    dob: {
      type: Date,
    },
    profileImage: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
