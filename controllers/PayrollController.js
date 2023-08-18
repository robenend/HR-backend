const Payroll = require('../models/Payroll');


const getAllPayrolls = async (req, res) => {
    const Payrolls = await Payroll.find();
    if (!Payrolls) return res.status(204).json({ 'message': 'No Payrolls found.' });
    res.json(Payrolls);
}

const createNewPayroll = async (req, res) => {
    if (!req?.body?.PayrollID || !req?.body?.EmployeeID || !req?.body?.Salary || !req?.body?.PeriodStartDate || !req?.body?.PeriodEndDate || !req?.body?.BasicSalary || !req?.body?.Allowance|| !req?.body?.Deduction || !req?.body?.NetSalary) {
        return res.status(400).json({ 'message': 'Input fields are required' });
    }
    try {
        const result = await Payroll.create({
            PayrollID: req.body.PayrollID,
            EmployeeID: req.body.EmployeeID,
            Salary: req.body.Salary,
            PeriodStartDate: req.body.PeriodStartDate,
            PeriodEndDate: req.body.PeriodEndDate,
            BasicSalary: req.body.BasicSalary,
            Allowance: req.body.Allowance,
            Deduction: req.body.Deduction,
            NetSalary: req.body.NetSalary,
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

const updatePayroll = async (req, res) => {
    if (!req?.body?.PayrollID) {
        return res.status(400).json({ 'message': 'PayrollID parameter is required.' });
    }
    // const Updates = Object.keys(req.body);
    // const payroll = await Payroll.findById(req.params.id);
    const payroll = await Payroll.findOne({ PayrollID: req.body.PayrollID }).exec();
    if (!payroll) {
        return res.status(201).json({ "message": `No Payroll matches ID ${req.body.PayrollID}.` });
    }

    if (req.body?.PayrollID) payroll.AttendanceID = req.body.AttendanceID;
    if (req.body?.EmployeeID) payroll.EmployeeID = req.body.EmployeeID;
    if (req.body?.Salary) payroll.Salary = req.body.Salary;
    if (req.body?.PeriodStartDate) payroll.PeriodStartDate = req.body.PeriodStartDate;
    if (req.body?.CheckOutDateTime) payroll.PeriodEndDate = req.body.PeriodEndDate;
    if (req.body?.CheckOutDateTime) payroll.PeriodEndDate = req.body.PeriodEndDate;
    if (req.body?.BasicSalary) payroll.BasicSalary = req.body.BasicSalary;
    if (req.body?.Allowance) payroll.Allowance = req.body.Allowance;
    if (req.body?.Deduction) payroll.Deduction = req.body.Deduction;
    if (req.body?.NetSalary) payroll.NetSalary = req.body.NetSalary;

    // Updates.forEach(update => {
    //    Payroll[update] = Updates[update];
    // });
    
    const result = await payroll.save();
    res.json(result);
}

const deletePayroll = async (req, res) => {
    if (!req?.body?.PayrollID) return res.status(400).json({ 'message': 'PayrollID required.' });

    const payroll = await Payroll.findOne({ PayrollID: req.body.PayrollID }).exec();
    if (!payroll) {
        return res.status(204).json({ "message": `No Payroll matches ID ${req.body.PayrollID}.` });
    }
    const result = await Payroll.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getPayroll = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'PayrollID required.' });

    const payroll = await Payroll.findOne({ PayrollID: req.params.id }).exec();
    if (!payroll) {
        return res.status(204).json({ "message": `No Payroll matches ID ${req.params.id}.` });
    }
    res.json(payroll);
}

module.exports = {
    getAllPayrolls,
    createNewPayroll,
    updatePayroll,
    deletePayroll,
    getPayroll
}