const Department = require("../models/Department");

const getAllDepartment = async (req, res) => {
  const department = await Department.find();
  if (!department)
    return res.status(204).json({ message: "No Departments found." });
  res.json(department);
};


const createNewDepartment = async (req, res) => {
  if (!req?.body?.departmentName || !req?.body?.description) {
    return res.status(400).json({ message: "Input fields are required" });
  }
  const {departmentName, description} = req.body

  try {
    const result = await Department.create({departmentName, description});
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateDepartment = async (req, res) => {
  if (!req?.body?._id) {
    return res.status(400).json({ message: "department _id is required." });
  }

  const {departmentName, description} = req.body;

  const department = await Department.findOne({_id: req.body._id}).exec();

  if (!department) {
    return res.status(204).json({ message: `No department matches _id ${department}.` });
  }

  let result = await Department.updateOne(
    { _id: req.body._id },
    { $set: {departmentName, description} }
  )

  res.status(200).json(result);
};


const deleteDepartment = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ message: "Department _id required." });

  const department = await Department.findOne({_id: req.body._id}).exec();
  if (!department) {
    return res.status(204).json({ message: `No Department matches _id ${req.body._id}.` });
  }

  const result = await department.deleteOne(); //{ _id: req.body.id }
  res.status(200).json(result);
};


const getDepartment = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ message: "Department _id required." });

  const department = await Department.findOne({ _id: req.body._id }).exec();

  if (!department) {
    return res.status(204).json({ message: `No Department matches _id ${req.body._id}.` });
  }
  res.status(200).json(department);
};

module.exports = {
  getAllDepartment,
  createNewDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
};
