const Rank = require("../models/rank");
const Position = require("../models/position");
const History = require("../models/history");
const Joi = require('joi');

const createNewRank = async (req, res) => {
  //console.log(req.body);
  try {
    // Validate the request body
    const schema = Joi.object({
      positionID: Joi.string().required().label('Position ID'),
      historyID: Joi.string().allow(null).empty('').label('History ID'),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join('; ');
      return res.status(400).json({ message: errorMessage });
    }

    // Check if the position exists
    const position = await Position.findById(value.positionID);
    if (!position) {
      return res.status(404).json({ message: 'Position not found.' });
    }

    if (value.historyID) {
    // Check if the history exists
    const history = await History.findById(value.historyID);
      return res.status(404).json({ message: 'History not found.' });
    }

    // Create a new rank document
    const newRank = new Rank(value);

    // Save the new rank document
    const createdRank = await newRank.save();

    res.status(201).json(createdRank);
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

const updateRank = async (req, res) => {
  try {
    // Validate the request body
    const rankID = req.body._id;
    const rank = await Rank.findById(rankID);

    if (!rank) {
      return res.status(404).json({ message: 'Rank not found.' });
    }

    const schema = Joi.object({
      rankID: Joi.string(),
      positionID: Joi.string()
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join('; ');
      return res.status(400).json({ message: errorMessage });
    }

    // Check if the position exists
    if (value.rankID) {
      const rank = await Rank.findById(value.rankID);
      if(!rank)
        return res.status(404).json({ message: 'Rank not found.' });
    }

    if (value.positionID) {
      const position = await Position.findById(value.positionID);

      if(!position)
        return res.status(404).json({ message: 'Position not found.' });
    }

    // Update the rank document with the new positionID
    Object.assign(rank, value);

    res.status(200).json(rank);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const deleteRank = async (req, res) => {
  try {
    const rankID = req.body._id;

    // Find the rank document and delete it
    const deletedRank = await Rank.findByIdAndDelete(rankID);

    if (!deletedRank) {
      return res.status(404).json({ message: 'Rank not found.' });
    }

    res.json({ message: 'Rank deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRankByID = async (req, res) => {
  try {
    const rankID = req.body._id;

    // Find the rank document by ID
    const rank = await Rank.findById(rankID);

    if (!rank) {
      return res.status(404).json({ message: 'Rank not found.' });
    }

    res.status(200).json(rank);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRanks = async (req, res) => {
  try {
    // Fetch all ranks
    const ranks = await Rank.find();
    res.status(200).json(ranks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRankByID,
  createNewRank,
  updateRank,
  deleteRank,
  getAllRanks,
};
