const EmpTraining = require("../models/EmployeeTraining");

const getAllEmpTrainings = async (req, res) => {
  const EmpTrainings = await EmpTraining.find();
  if (!EmpTrainings)
    return res.status(204).json({ message: "No Training Employees found." });
  res.json(EmpTrainings);
};

const createNewEmpTraining = async (req, res) => {
  //console.log(req.body);
  if (
    !req?.body?.TrainingID ||
    // !req?.body?.EmployeeID ||
    !req?.body?.Description ||
    // !req?.body?.Trainer ||
    !req?.body?.StartDate ||
    !req?.body?.EndDate ||
    !req?.body?.TrainingName
  ) {
    return res.status(400).json({ message: "Input fields are required" });
  }
  try {
    const result = await EmpTraining.create({
      TrainingID: req.body.TrainingID,
      EmployeeID: req.body.EmployeeID,
      Description: req.body.Description,
      Trainer: req.body.Trainer,
      StartDate: req.body.StartDate,
      EndDate: req.body.EndDate,
      TrainingName: req.body.TrainingName,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmpTraining = async (req, res) => {
  if (!req?.body?.TrainingID) {
    return res.status(400).json({ messAge: "ID parameter is required." });
  }

  const up = await EmpTraining.findOne({
    TrainingID: req.body.TrainingID,
  }).exec();
  if (!up) {
    return res
      .status(204)
      .json({ messAge: `No Student matches ID ${req.body.TrainingID}.` });
  }
  if (req.body?.Description) up.Description = req.body.Description;
  if (req.body?.Trainer) up.Trainer = req.body.Trainer;
  if (req.body?.StartDate) up.StartDate = req.body.StartDate;
  if (req.body?.EndDate) up.EndDate = req.body.EndDate;
  if (req.body?.TrainingName) up.TrainingName = req.body.TrainingName;
  const result = await up.save();
  res.json(result);
};

const deleteEmpTraining = async (req, res) => {
  if (!req?.body?.TrainingID)
    return res.status(400).json({ message: "TrainingID required." });

  const EmpTrainingResult = await EmpTraining.findOne({
    TrainingID: req.body.TrainingID,
  }).exec();
  if (!EmpTrainingResult) {
    return res.status(204).json({
      message: `No Employee Training matches ID ${req.body.TrainingID}.`,
    });
  }
  const result = await EmpTrainingResult.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getEmpTraining = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee Training required." });

  const result = await EmpTraining.findOne({
    EmpTrainingID: req.params.id,
  }).exec();
  if (!result) {
    return res
      .status(204)
      .json({ message: `No Employee Training matches ID ${req.params.id}.` });
  }
  res.json(result);
};

module.exports = {
  getAllEmpTrainings,
  createNewEmpTraining,
  updateEmpTraining,
  deleteEmpTraining,
  getEmpTraining,
};
