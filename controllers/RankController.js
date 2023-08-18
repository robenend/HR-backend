const Rank = require("../models/Rank");

const getAllRank = async (req, res) => {
  const rank = await Rank.find();
  if (!rank) return res.status(204).json({ message: "No Ranks found." });
  res.json(rank);
};

const createNewRank = async (req, res) => {
  //console.log(req.body);
  if (
    // !req?.body?.DepartmentID ||a
    !req?.body?.DepartmentName ||
    !req?.body?.Description
  ) {
    return res.status(400).json({ message: "Input fields are required" });
  }
  try {
    const result = await Department.create({
      DepartmentID: req.body.DepartmentID,
      DepartmentName: req.body.DepartmentName,
      Description: req.body.Description,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDepartment = async (req, res) => {
  if (!req?.body?.DepartmentName) {
    return res
      .status(400)
      .json({ message: "Department Name parameter is required." });
  }

  const Dept = await Department.findOne({
    DepartmentName: req.body.DepartmentName,
  }).exec();
  if (!Dept) {
    return res
      .status(r)
      .json({ message: `No course matches ID ${req.body.DepartmentName}.` });
  }

  if (req.body?.DepartmentName) Dept.DepartmentName = req.body.DepartmentName;
  if (req.body?.Description) Dept.Description = req.body.Description;
  // if (req.body?.NewCourseID) Dept.CourseID = req.body.NewCourseID;
  const result = await Dept.save();
  res.json(result);
};

const deleteDepartment = async (req, res) => {
  if (!req?.body?.DepartmentName)
    return res.status(400).json({ message: "Department Name required." });

  const Dept = await Department.findOne({
    DepartmentName: req.body.DepartmentName,
  }).exec();
  if (!Dept) {
    return res
      .status(204)
      .json({ message: `No Course matches ID ${req.body.DepartmentName}.` });
  }
  const result = await Dept.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getDepartment = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Department required." });

  const Dept = await Department.findOne({ DepartmentID: req.params.id }).exec();
  if (!Dept) {
    return res
      .status(204)
      .json({ message: `No Departments matches ID ${req.params.id}.` });
  }
  res.json(Dept);
};

module.exports = {
  getAllDepartment,
  createNewDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
};
