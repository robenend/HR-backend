const Position = require('../models/position');
const Recruitment = require('../models/recruitment')
const Employee = require('../models/employee');
const Joi = require('joi');

const positionController = {
  // Create a new position
  createPosition: async (req, res) => {
    try {
      const { positionName, description } = req.body;
  
      // Define a Joi schema for validation
      const schema = Joi.object({
        positionName: Joi.string().required(),
        description: Joi.string(),
      });
  
      // Validate the request body against the schema
      const { error, value } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).json({ message: errorMessage });
      }
  
      // Create a new position
      const position = new Position({
        positionName: value.positionName,
        description: value.description,
      });
  
      const savedPosition = await position.save();
      res.status(201).json(savedPosition);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
    try {
      const positionId = req.body._id;
      const position = await Position.findById(positionId);

      if (!position) {
        return res.status(404).json({ message: 'Position not found' });
      }

      res.json(position);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update position by ID
  updatePosition: async (req, res) => {
    try {
      const id = req.body._id;
      const existingPosition = await Position.findById(id);

      if (!existingPosition) {
        return res.status(404).json({ message: 'Position not found' });
      }
  
      // Define a Joi schema for validation
      const schema = Joi.object({
        positionName: Joi.string().required(),
        description: Joi.string(),
      });
  
      // Validate the request body against the schema
      const { error, value } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).json({ message: errorMessage });
      }
  
      // Update the position
      existingPosition.positionName = value.positionName;
      existingPosition.description = value.description;
  
      const updatedPosition = await existingPosition.save();
      res.json(updatedPosition);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
    const positionId = req.body._id;

    try {
      const employees = await Employee.find({ positionID: positionId });
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get recruitments for a position
  getRecruitmentsForPosition: async (req, res) => {
    const positionId = req.body._id;

    try {
      const recruitments = await Recruitment.find({ positionID: positionId });
      res.status(200).send(recruitments);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },
};

module.exports = positionController;
