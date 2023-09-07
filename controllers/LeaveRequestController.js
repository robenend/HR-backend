const LeaveRequest = require('../models/leaveRequest');
const Employee = require('../models/employee');

const leaveRequestController = {
  createLeaveRequest: async (req, res) => {
    try {
      const leaveRequestData = req.body;
      const employee = await Employee.findById(leaveRequestData.employee);
  
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }
  
      const startDate = new Date(leaveRequestData.startDate);
      const endDate = new Date(leaveRequestData.endDate);
      const currentDate = new Date();
  
      // Check if start date is greater than or equal to current date
      if (startDate < currentDate) {
        return res.status(400).send({ error: 'Start date must be greater than or equal to current date' });
      }
  
      // Check if end date is greater than or equal to start date
      if (endDate < startDate) {
        return res.status(400).send({ error: 'End date must be greater than or equal to start date' });
      }
  
      // Calculate leave days between startDate and endDate
      const leaveDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  
      // Compare with employee's available leave days for the year
      if (leaveDays > employee.availableLeaveDays) {
        return res.status(400).send({ error: 'Not enough available leave days' });
      }
  
      // Check if the approver is a valid employee
      const approver = await Employee.findById(leaveRequestData.approvedBy);
      if (!approver) {
        return res.status(404).send({ error: 'Approver not found' });
      }
  
      const leaveRequest = new LeaveRequest(leaveRequestData);
  
      // Update employee's available leave days and approval status if approved
      if (leaveRequest.approved) {
        employee.availableLeaveDays -= leaveDays;
        leaveRequest.approvedDate = new Date();
      }
  
      await Promise.all([leaveRequest.save(), employee.save()]);
  
      res.status(201).send(leaveRequest);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Server Error' });
    }
  },
  

  approveLeaveRequest: async (req, res) => {
    try {
      const leaveRequestId = req.params.id;
      const leaveRequest = await LeaveRequest.findById(leaveRequestId);

      if (!leaveRequest) {
        return res.status(404).send({ error: 'Leave request not found' });
      }

      // Check if the approver is a valid employee
      const approver = await Employee.findById(req.body.approvedBy);
      if (!approver) {
        return res.status(404).send({ error: 'Approver not found' });
      }

      // Update leave request's approval status and approver
      leaveRequest.approved = true;
      leaveRequest.approvedBy = approver._id;
      leaveRequest.approvedDate = new Date();
      await leaveRequest.save();

      // Update employee's available leave days
      const employee = await Employee.findById(leaveRequest.employee);
      const startDate = new Date(leaveRequest.startDate);
      const endDate = new Date(leaveRequest.endDate);
      const leaveDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
      employee.availableLeaveDays -= leaveDays;
      await employee.save();

      res.status(200).send(leaveRequest);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Server Error' });
    }
  },

  rejectLeaveRequest: async (req, res) => {
    try {
      const leaveRequestId = req.params.id;
      const leaveRequest = await LeaveRequest.findById(leaveRequestId);

      if (!leaveRequest) {
        return res.status(404).send({ error: 'Leave request not found' });
      }

      // Check if the reject date is before or after leave start date
      const rejectDate = new Date();
      const startDate = new Date(leaveRequest.startDate);
      const endDate = new Date(leaveRequest.endDate);
      const leaveDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

      if (leaveRequest.approved) {
        // Update employee's available leave days based on reject scenario
        const employee = await Employee.findById(leaveRequest.employee);
        if (rejectDate < startDate) {
          employee.availableLeaveDays += leaveDays;
        } else {
          const remainingLeaveDays = (endDate - rejectDate) / (1000 * 60 * 60 * 24) + 1;
          employee.availableLeaveDays += remainingLeaveDays;
        }
        await employee.save();
      }

      // Update leave request's approval status and rejection date
      leaveRequest.approved = false;
      leaveRequest.approvedDate = rejectDate;
      await leaveRequest.save();

      res.status(200).send(leaveRequest);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Server Error' });
    }
},

// Update a leave request by ID
updateLeaveRequest: async (req, res) => {
  try {
    const leaveRequestId = req.params.id;
    const updates = req.body;
    const leaveRequest = await LeaveRequest.findById(leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).send({ error: 'Leave request not found' });
    }

    // Validate start and end dates
    if (updates.startDate && new Date(updates.startDate) > new Date(updates.endDate)) {
      return res.status(400).send({ error: 'Start date must be before end date' });
    }

    // Apply updates and save the leave request
    Object.keys(updates).forEach(update => {
      leaveRequest[update] = updates[update];
    });
    await leaveRequest.save();

    res.status(200).send(leaveRequest);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server Error' });
  }
},

// Delete a leave request by ID
deleteLeaveRequest: async (req, res) => {
  try {
    const leaveRequestId = req.params.id;
    const leaveRequest = await LeaveRequest.findByIdAndDelete(leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).send({ error: 'Leave request not found' });
    }

    res.status(200).send(leaveRequest);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server Error' });
  }
},

  getLeaveRequestsForEmployee : async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const leaveRequests = await LeaveRequest.find({ employee: employeeId });

    if (leaveRequests.length === 0) {
      return res.status(404).send({ error: 'No leave requests found for the employee' });
    }

    res.status(200).send(leaveRequests);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server Error' });
  }
},

};

module.exports = leaveRequestController;
