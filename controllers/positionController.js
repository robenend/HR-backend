const Position = require('../models/Position');
const Recruitment = require('../models/Recruitment')
const Employee = require('../models/Employee');

const positionController = {
  // Create a new position
  createPosition: async (req, res) => {
    try {
      const positionData = req.body;
      const position = new Position(positionData);
      await position.save();
      res.status(201).send(position);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  // Get all positions
  getAllPositions: async (req, res) => {
    try {
      const positions = await Position.find();
      res.status(200).send(positions);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get position by ID
  getPositionById: async (req, res) => {
    const id = req.params.id;

    try {
      const position = await Position.findById(id);
      if (!position) {
        return res.status(404).send({ error: 'Position not found' });
      }
      res.status(200).send(position);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Update position by ID
  updatePosition: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = Object.keys(req.body);

      const allowedUpdates = ['positionName', 'description'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
      }

      const position = await Position.findById(id);

      if (!position) {
        return res.status(404).send({ error: 'Position not found' });
      }

      updates.forEach(update => {
        position[update] = req.body[update];
      });

      await position.save();
      res.status(200).send(position);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  // Delete position by ID
  deletePosition: async (req, res) => {
    try {
      const id = req.params.id;
      const position = await Position.findByIdAndDelete(id);

      if (!position) {
        return res.status(404).send({ error: 'Position not found' });
      }

      res.status(200).send(position);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get employees for a position
  getEmployeesForPosition: async (req, res) => {
    const positionId = req.params.id;

    try {
      const employees = await Employee.find({ positionID: positionId });
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get recruitments for a position
  getRecruitmentsForPosition: async (req, res) => {
    const positionId = req.params.id;

    try {
      const recruitments = await Recruitment.find({ positionID: positionId });
      res.status(200).send(recruitments);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },
};

module.exports = positionController;
