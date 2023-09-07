const Document = require('../models/document');
const Employee = require('../models/employee')
const handleFileUpload = require('./uploadController')

const getAllDocuments = async (req, res) => {

    const documents = await Document.find();
    if (!documents) return res.status(204).json({ message: 'No Documents found.' });
    res.json(documents);
}

const createNewDocument = async (req, res) => {
    if (!req?.body?.employeeID || !req?.body?.title || !req?.body?.description|| !req?.body?.fileURL) {
        return res.status(400).json({ message : 'Check the required Input Fields' });
    }

    if(!mongoose.Types.ObjectId.isValid(req.body.employeeID)){
        return res.status(400).json({ message : 'Invalid employeeID'})
    }

    try {

        const result = await Document.create(req.body);

        const uploadRes = handleFileUpload(req, res);
        res.status(201).json({result, uploadRes});

    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

const updateDocument = async (req, res) => {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'DocumentID parameter is required.' });
    }
    // const Updates = Object.keys(req.body);
    const document = await Document.findOne({ _id: req.body._id }).exec();

    if (!document) {
        return res.status(404).json({ message : `No Document matches _id: ${req.body._id}.` });
    }
    
    if(!mongoose.Types.ObjectId.isValid(req.body.employeeID)){
        return res.status(400).json({ message : 'Invalid employeeID'})
    }

    const uploadDate = Date.now()

    let result = await Attendance.updateOne(
        { _id: req.body._id },
        { $set: {...req.body, uploadDate}}
    )

    res.json(result);
}


const deleteDocument = async (req, res) => {
    if (!req?.body?._id) return res.status(400).json({ message: 'Document _id required.' });

    const document = await Document.findById(req.body._id);
    if (!document) {
        return res.status(204).json({ message : `No Document matches _id ${req.body._id}.` });
    }
    const result = await document.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}


const getDocument = async (req, res) => {
    if (!req?.body?._id) return res.status(400).json({ 'message': 'Document _id required.' });
    
    const document = await Document.findById(req.body._id)
    const employee = await Employee.findById(document.employeeID);

    if (!document) {
        return res.status(204).json({ "message": `No Document matches _id ${req.body._id}.` });
    }
    
    res.status(200).json({document, employee});
}


module.exports = {
    getAllDocuments,
    getDocument,
    createNewDocument,
    updateDocument,
    deleteDocument
}