const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  rating: { type: Number },
});

const AlbumSchema = new mongoose.Schema({
  title: String,
  album: { type: [String] },
});

const serviceSchema = new mongoose.Schema({
  profession: { type: String, required: true, lowercase: true },
  images: { type: [String], default: [] },
  albums: { type: [AlbumSchema] },
  totalRating: { type: Number, default: 0 },
  rating: [RatingSchema],
  following: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  followers: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "profile" },
});
module.exports = Service = mongoose.model("service", serviceSchema);
