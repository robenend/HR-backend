const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  HistoryId: {
    type: Number,
    required: true,
    unique: true,
  },

  RankID: {
    type: Number,
    ref: "RankID",
    required: false,
  },

  RankName: {
    type: String,
    required: true,
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
