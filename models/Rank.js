const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankSchema = new Schema({
  RankId: {
    type: Number,
    required: true,
    unique: true,
  },
  PositionId: {
    type: Number,
    ref: "PositionID",
    required: false,
  },
  HistoryId: {
    type: Number,
    ref: "HistoryID",
    required: false,
  },
});

module.exports = mongoose.model("Rank", RankSchema);
