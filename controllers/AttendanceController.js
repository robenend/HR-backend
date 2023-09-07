const Attendance = require('../models/attendance');
const Employee = require('../models/employee')

const statusCheck = (status, checkIn, checkOut, res) => {
    if(status && status !== "On Leave") {
        if (!checkIn || !checkOut) {
          return res.status(400).json({ message : "CheckInDateTime and CheckOutDateTime can't be null." });
        }
      } else if (status === "On Leave") {
        checkIn = null;
        checkOut = null;
    }
    return {checkIn, checkOut}
}

const getAllAttendances = async (req, res) => {
    const attendances = await Attendance.find();
    if (!attendances) return res.status(204).json({ message: 'No attendances found.' });
    res.status(200).json(attendances);
}


const createNewAttendance = async (req, res) => {
    const {employeeID, checkInDateTime, checkOutDateTime, recordedBy, status, notes} = req.body || {};

    if (!employeeID || !recordedBy || !status) {
        return res.status(400).json({ message : 'Check the required input fields.' });
    }

    if(!mongoose.Types.ObjectId.isValid(employeeID)){
        return res.status(400).json({ message : 'Invalid employeeID'})
    }

    const {checkIn, checkOut} = statusCheck(status, checkInDateTime, checkOutDateTime, res)

    if (req.user && req.role == "attendanceAdmin"){
        try {
            const result = await Attendance.create({employeeID, checkIn, checkOut, recordedBy, status, notes});
            res.status(201).json(result);
         
        }catch (err) {
            res.status(500).json({message: err.message});

        }

    }
}

const updateAttendance = async (req, res) => {
    if (!req?.body?._id) {
        return res.status(400).json({ message : '_id is not valid.' });
    }

    if(!mongoose.Types.ObjectId.isValid(req.body.employeeID)){
        return res.status(400).json({ message : 'Invalid employeeID'})
    }
    

    try{

        const updates = req.body;

        const attendance = await Attendance.findById(req.body._id);
        const {checkIn, checkOut} = statusCheck(updates.status, updates.checkInDateTime, updates.checkOutDateTime, res)
    
        Object.assign(attendance, updates);

        attendance.checkInDateTime = checkIn;
        attendance.checkOutDateTime = checkOut;
        
        await attendance.save();

        res.status(200).json({result})

    }catch(err){
        return res.status(400).json({message: err.message})
    }

}

const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const deleteAttendance = async (req, res) => {
    if (!req?.body?._id) return res.status(400).json({ message : '_id is not valid.' });

    const attendance = await Attendance.findOne({ _id: req.body._id }).exec();
    if (!attendance) {
        return res.status(204).json({ message: `No attendance is found with id: ${req.body._id}.` });
    }
    
    const result = await attendance.deleteOne(); //{ _id: req.body.id }
    res.status(204).json({message: "deleted successfully"});
}


const getAttendance = async (req, res) => {
    if (!req?.body?._id) return res.status(400).json({ message : '_id not valid.' });

    const attendance = await Attendance.findOne({ _id: req.body._id }).exec();
    if (!attendance) {
        return res.status(204).json({ message: `No attendance matches _id ${req.body._id}.` });
    }
    res.json(attendance);
}

module.exports = {
    getAllAttendances,
    getAttendance,
    createNewAttendance,
    updateAttendance,
    deleteAttendance
}