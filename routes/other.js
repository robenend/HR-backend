const express = require('express');
const AttendanceController = require("../controllers/AttendanceController");
const PayrollController = require("../controllers/PayrollController");
const DocumentController = require("../controllers/DocumentController");
const DepartmentController = require("../controllers/DepartmentController");
const EmployeeTrainingController = require("../controllers/EmployeeTrainingController");
const HistoryController = require("../controllers/HistoryController");
const leaveRequestController = require('../controllers/LeaveRequestController');
const handleFileUpload = require('../controllers/uploadController')
const router = express.Router();

//payrole
router.post("/payroll", PayrollController.createNewPayroll);
router.get("/payroll", PayrollController.getAllPayrolls);
router.get("/payroll/:id", PayrollController.getPayroll);
router.delete("/payroll", PayrollController.deletePayroll);
router.put("/payroll", PayrollController.updatePayroll);

//document
router.post("/document", DocumentController.createNewDocument);
router.get("/document", DocumentController.getAllDocuments);
router.get("/document/:id", DocumentController.getDocument);
router.delete("/document", DocumentController.deleteDocument);
router.put("/document", DocumentController.updateDocument);

//Department
router.post("/department", DepartmentController.createNewDepartment);
router.get("/department", DepartmentController.getAllDepartment);
router.get("/department/:id", DepartmentController.getDepartment);
router.delete("/department", DepartmentController.deleteDepartment);
router.put("/department", DepartmentController.updateDepartment);
// router.get('/student', require('./router/api/students'));

//EmployeeTraining
router.post("/employeeTraining", EmployeeTrainingController.createNewEmpTraining);
router.get("/employeeTraining", EmployeeTrainingController.getAllEmpTrainings);
router.get("/employeeTraining/:id", EmployeeTrainingController.getEmpTraining);
router.delete("/employeeTraining", EmployeeTrainingController.deleteEmpTraining);
router.put("/employeeTraining", EmployeeTrainingController.updateEmpTraining);

//LeaveRequest

router.post('/leave-requests', leaveRequestController.createLeaveRequest);
router.patch('/leave-requests/approve/:id', leaveRequestController.approveLeaveRequest);
router.patch('/leave-requests/reject/:id', leaveRequestController.rejectLeaveRequest);
router.patch('/leave-requests/:id', leaveRequestController.updateLeaveRequest);
router.delete('/leave-requests/:id', leaveRequestController.deleteLeaveRequest);
router.get('/employees/:employeeId/leave-requests', leaveRequestController.getLeaveRequestsForEmployee);

//History
router.post("/history", HistoryController.createHistory);
router.get("/history", HistoryController.getAllHistory);
router.get("/history/:id", HistoryController.getHistory);
router.delete("/history", HistoryController.deleteHistory);
router.put("/history", HistoryController.updateHistory);


router.post("/upload", handleFileUpload);

module.exports = router;

