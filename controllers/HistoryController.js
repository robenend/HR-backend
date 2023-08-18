const History = require("../models/History");

const getAllHistory = async (req, res) => {
  const His = await History.find();
  if (!His) return res.status(204).json({ message: "No History found." });
  res.json(His);
};

const createHistory = async (req, res) => {
  //console.log(req.body);
  if (
    !req?.body?.HistoryId ||
    // !req?.body?.RankID ||
    !req?.body?.RankName ||
    !req?.body?.Description ||
    !req?.body?.AssignDate
  ) {
    return res.status(400).json({ message: "Input fields are required" });
  }
  try {
    const result = await History.create({
      HistoryId: req.body.HistoryId,
      RankName: req.body.RankName,
      Description: req.body.Description,
      AssignDate: req.body.AssignDate,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHistory = async (req, res) => {
  if (!req?.body?.HistoryId) {
    return res
      .status(400)
      .json({ message: "Hisory Id parameter is required." });
  }

  const His = await History.findOne({
    HistoryId: req.body.HistoryId,
  }).exec();
  if (!His) {
    return res
      .status(r)
      .json({ message: `No course matches ID ${req.body.HistoryId}.` });
  }

  if (req.body?.RankName) His.RankName = req.body.RankName;
  if (req.body?.Description) His.Description = req.body.Description;
  if (req.body?.AssignDate) His.AssignDate = req.body.AssignDate;
  const result = await His.save();
  res.json(result);
};

const deleteHistory = async (req, res) => {
  if (!req?.body?.HistoryId)
    return res.status(400).json({ message: "History ID required." });

  const His = await History.findOne({
    HistoryId: req.body.HistoryId,
  }).exec();
  if (!His) {
    return res
      .status(204)
      .json({ message: `No History matches ID ${req.body.HistoryId}.` });
  }
  const result = await His.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getHistory = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "History required." });

  const His = await History.findOne({ HistoryId: req.params.id }).exec();
  if (!His) {
    return res
      .status(204)
      .json({ message: `No History matches ID ${req.params.id}.` });
  }
  res.json(Dept);
};

module.exports = {
  getAllHistory,
  createHistory,
  updateHistory,
  deleteHistory,
  getHistory,
};
