const mongoose = require("mongoose");

const arraySchema = new mongoose.Schema({
  title: String,
  images: [String],
});

const billboardSchema = new mongoose.Schema({
  name: String,
  billboard: [arraySchema],
});
module.exports = BillBoard = mongoose.model("billboard", billboardSchema);
