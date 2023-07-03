const mongoose = require("mongoose");

const billboardSchema = new mongoose.Schema({
  name: String,
  selected: { type: Boolean, default: false },
  billboard: [String],
});
module.exports = BillBoard = mongoose.model("billboard", billboardSchema);
