const History = require("../models/history");
const Joi = require('joi');

const getAllHistory = async (req, res) => {
  const His = await History.find();
  if (!His) return res.status(204).json({ message: "No History found." });
  res.json(His);
};

const createHistory = async (req, res) => {

  const { rankID, description, assignDate } = req?.body || {};

if (!rankID || !description || !assignDate) {
  return res.status(400).json({ message: "Input fields are required" });
}

if(!mongoose.Types.ObjectId.isValid(rankID)){
  return res.status(400).json({ message : 'Invalid rankID'})
}

try {

  const result = await History.create({rankID, description, assignDate});
  return res.status(201).json(result);

} catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHistory = async (req, res) => {
  if (!req?.body?._id) {
    return res.status(400).json({ message: "History _id is required." });
  }

  const updatedData = req.body;
  const history = await History.findById(updatedData._id);
  
  if (!history) {
    return res.status(400).json({ message: `No History matches ID ${req.body._id}.` });
  }

  if(updatedData.rankID && !mongoose.Types.ObjectId.isValid(updatedData.rankID)){
    return res.status(400).json({ message : 'Invalid rankID'})
  }

  Object.assign(history, updatedData);
  
  const result = await history.save();
  res.json(result);
};


const deleteHistory = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ message: "History _id required." });

  const history = await History.findById(req.body._id)
  if (!history) {
    return res.status(204).json({ message: `No History matches _id ${req.body._id}.` });
  }
  const result = await history.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};


const getHistory = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ message: "History required _id" });

  const history = await History.findById(req.body._id);
  if (!history) {
    return res.status(204).json({ message: `No History matches _id ${req.body._id}.` });
  }
  res.statu(200).json(history);
};


module.exports = {
  getAllHistory,
  createHistory,
  updateHistory,
  deleteHistory,
  getHistory,
};
