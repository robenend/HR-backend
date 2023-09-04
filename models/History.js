const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  RankID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rank",
    required: false,
  },

  Description: {
    type: String,
    required: true,
  },

  AssignDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("History", HistorySchema);
