const Joi = require('joi');
const Recruitment = require('../models/Recruitment');
const Position = require('../models/Position');
const Employee = require('../models/Employee');
const Joi = require('joi');


const recruitmentController = {
  // Create a new recruitment
  createRecruitment: async (req, res) => {
    try {
      // Define a Joi schema for validation
      const schema = Joi.object({
        positionID: Joi.string().required(),
        hiringManagerID: Joi.string().required(),
        jobTitle: Joi.string().required(),
        jobDescription: Joi.string(),
        requiredSkills: Joi.array().items(Joi.string()),
        status: Joi.string().valid('Open', 'Closed').required(),
        applicationDeadline: Joi.date().required(),
        hiredEmployeeID: Joi.string().allow(null).empty(''),
      });
  
      // Validate the request body against the schema
      const { error, value } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).json({ message: errorMessage });
      }
  
      // Check if the position exists
      const position = await Position.findById(value.positionID);
  
      if (!position) {
        return res.status(404).json({ message: 'Position not found' });
      }
  
     // Check if the hiring manager exists
      const hiringManager = await Employee.findById(value.hiringManagerID);

      if (!hiringManager) {
        return res.status(404).json({ message: 'Hiring manager not found' });
      
      }
      // Create a new recruitment
      const recruitment = new Recruitment(value);
  
      const savedRecruitment = await recruitment.save();
      res.status(201).json(savedRecruitment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all recruitments
  getAllRecruitments: async (req, res) => {
    try {
      const recruitments = await Recruitment.find();
      res.status(200).send(recruitments);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get recruitment by ID
  getRecruitmentById: async (req, res) => {
    const id = req.body._id;

    try {
      const recruitment = await Recruitment.findById(id);
      if (!recruitment) {
        return res.status(404).send({ error: 'Recruitment not found' });
      }
      res.status(200).send(recruitment);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Update recruitment by ID
  updateRecruitment: async (req, res) => {
    try {

      const recruitmentId = req.body._id;  
      
       // Find the recruitment by ID
       const recruitment = await Recruitment.findById(recruitmentId);
  
       if (!recruitment) {
         return res.status(404).json({ message: 'Recruitment not found' });
       }
      // Define a Joi schema for validation
      const schema = Joi.object({
        positionID: Joi.string(),
        hiringManagerID: Joi.string(),
        jobTitle: Joi.string().required(),
        jobDescription: Joi.string(),
        requiredSkills: Joi.array().items(Joi.string()),
        status: Joi.string().valid('Open', 'Closed'),
        applicationDeadline: Joi.date(),
        hiredEmployeeID: Joi.string().allow(null).empty(''),
      });
  
      // Validate the request body against the schema
      const { error, value } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).json({ message: errorMessage });
      }

      const position = await Position.findById(value.positionID);
  
      if (!position) {
        return res.status(404).json({ message: 'Position not found' });
      }
  
     // Check if the hiring manager exists
      const hiringManager = await Employee.findById(value.hiringManagerID);

      if (!hiringManager) {
        return res.status(404).json({ message: 'Hiring manager not found' });
      
      }
  
      // Update the recruitment fields
      Object.assign(recruitment, value);
  
      // Save the updated recruitment
      const updatedRecruitment = await recruitment.save();
  
      res.status(200).json(updatedRecruitment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete recruitment by ID
  deleteRecruitment: async (req, res) => {
    try {
      const id = req.body._id;
      const recruitment = await Recruitment.findByIdAndDelete(id);

      if (!recruitment) {
        return res.status(404).send({ error: 'Recruitment not found' });
      }

      res.status(200).send(recruitment);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },
  // Get position for a recruitment
  getPositionForRecruitment: async (req, res) => {
    try {
      const recruitmentId = req.body._id;
      const recruitment = await Recruitment.findById(recruitmentId);

      if (!recruitment) {
        return res.status(404).send({ error: 'Recruitment not found' });
      }

      const position = await Position.findById(recruitment.positionID);
      if (!position) {
        return res.status(404).send({ error: 'Position not found' });
      }

      res.status(200).send(position);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },
};

module.exports = recruitmentController;
