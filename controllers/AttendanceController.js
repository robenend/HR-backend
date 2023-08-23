const Attendance = require('../models/Attendance');

const getAllAttendances = async (req, res) => {
    const Attendances = await Attendance.find();
    if (!Attendances) return res.status(204).json({ 'message': 'No Attendances found.' });
    res.json(Attendances);
}

const createNewAttendance = async (req, res) => {
    if (!req?.body?.AttendanceID || !req?.body?.EmployeeID || !req?.body?.CheckInDateTime || !req?.body?.CheckOutDateTime) {
        return res.status(400).json({ 'message': 'Check the required input fields.' });
    }

    try {
        const result = await Attendance.create({
            AttendanceID: req.body.AttendanceID,
            EmployeeID: req.body.EmployeeID,
            CheckInDateTime: req.body.CheckInDateTime,
            CheckOutDateTime: req.body.CheckOutDateTime
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

const updateAttendance = async (req, res) => {
    if (!req?.body?.AttendanceID) {
        return res.status(400).json({ 'message': 'AttendanceID parameter is required.' });
    }

    const attendance = await Attendance.findOne({ AttendanceID: req.body.AttendanceID }).exec();
    if (!attendance) {
        return res.status().json({ "message": `No Attendance matches ID ${req.body.CourseID}.` });
    }

    if (req.body?.AttendanceID) attendance.AttendanceID = req.body.AttendanceID;
    if (req.body?.EmployeeID) attendance.EmployeeID = req.body.EmployeeID;
    if (req.body?.CheckInDateTime) attendance.CheckInDateTime = req.body.CheckInDateTime;
    if (req.body?.CheckOutDateTime) attendance.CheckOutDateTime = req.body.CheckOutDateTime;
    const result = await attendance.save();
    res.json(result);
}

const deleteAttendance = async (req, res) => {
    if (!req?.body?.AttendanceID) return res.status(400).json({ 'message': 'AttendanceID required.' });

    const attendance = await Attendance.findOne({ AttendanceID: req.body.AttendanceID }).exec();
    if (!attendance) {
        return res.status(204).json({ "message": `No Attendance matches ID ${req.body.AttendanceID}.` });
    }
    const result = await Attendance.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getAttendance = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'AttendanceID required.' });

    const attendance = await Attendance.findOne({ AttendanceID: req.params.id }).exec();
    if (!attendance) {
        return res.status(204).json({ "message": `No Attendance matches ID ${req.params.id}.` });
    }
    res.json(attendance);
}

module.exports = {
    getAllAttendances,
    createNewAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendance
}