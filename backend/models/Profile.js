const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profileImg: String,
  city: { type: String, required: true },
  adress: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = Profile = mongoose.model("profile", profileSchema);
