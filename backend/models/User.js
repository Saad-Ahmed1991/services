const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, uppercase: true, trim: true },
  lastName: { type: String, required: true, uppercase: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  role: {
    type: String,
    default: "client",
    enum: ["client", "worker", "admin", "superAdmin"],
  },
  password: { type: String, required: true },
  hasProfile: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now() },
  hasService: { type: Boolean, default: false },
});
module.exports = User = mongoose.model("user", userSchema);
