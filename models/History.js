const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
 description: {
    type: String,
    required: true,
  },

  assignDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("History", HistorySchema);
