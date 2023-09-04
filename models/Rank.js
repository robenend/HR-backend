const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankSchema = new Schema({
  positionID: {
    type: String,
    ref: "Position",
    required: [true, "Position ID is required."],
  },
  historyID: {
    type: String,
    ref: "History",
    required: false,
  },
});

module.exports = mongoose.model("Rank", RankSchema);