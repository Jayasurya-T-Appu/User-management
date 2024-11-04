const mongoose = require("mongoose");
const TokenSchema = require('./Token')
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  tokens:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token' 
}]
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema)