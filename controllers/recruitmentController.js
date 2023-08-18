const Recruitment = require('../models/Recruitment');

const recruitmentController = {
  // Create a new recruitment
  createRecruitment: async (req, res) => {
    try {
      const recruitmentData = req.body;
      const recruitment = new Recruitment(recruitmentData);
      await recruitment.save();
      res.status(201).send(recruitment);
    } catch (error) {
      res.status(400).send({ error: error.message });
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
    const id = req.params.id;

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
      const id = req.params.id;
      const updates = Object.keys(req.body);

      const allowedUpdates = ['positionID', 'hiringManagerID', 'jobTitle', 'jobDescription', 'requiredSkills', 'status', 'applicationDeadline'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
      }

      const recruitment = await Recruitment.findById(id);

      if (!recruitment) {
        return res.status(404).send({ error: 'Recruitment not found' });
      }

      updates.forEach(update => {
        recruitment[update] = req.body[update];
      });

      await recruitment.save();
      res.status(200).send(recruitment);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  // Delete recruitment by ID
  deleteRecruitment: async (req, res) => {
    try {
      const id = req.params.id;
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
      const recruitmentId = req.params.id;
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
