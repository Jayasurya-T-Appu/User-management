const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password:
  {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  authToken: {
    type: String,
    expiresAt: Date,
    default:""
  },
  refreshToken: {
    type: String,
    expiresAt: Date,
    default:""
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},
  {
    timestamps: true,
  });

module.exports = mongoose.model("User", userSchema)