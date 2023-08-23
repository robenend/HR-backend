const Document = require('../models/Document');


const getAllDocuments = async (req, res) => {
    const Documents = await Document.find();
    if (!Documents) return res.status(204).json({ 'message': 'No Documents found.' });
    res.json(Documents);
}
//
const createNewDocument = async (req, res) => {
    if (!req?.body?.DocumentID || !req?.body?.EmployeeID || !req?.body?.Title || !req?.body?.Description|| !req?.body?.FileUrl) {
        return res.status(400).json({ 'message': 'Input fields are required' });
    }
    try {
        const date = new Date()
        const result = await Document.create({
            DocumentID: req.body.DocumentID,
            EmployeeID: req.body.EmployeeID,
            Title: req.body.Title,
            Description: req.body.Description,
            UploadDate: Date.now(),
            FileUrl: req.body.FileUrl
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

const updateDocument = async (req, res) => {
    if (!req?.body?.DocumentID) {
        return res.status(400).json({ 'message': 'DocumentID parameter is required.' });
    }
    // const Updates = Object.keys(req.body);
    const document = await Document.findOne({ DocumentID: req.body.DocumentID }).exec();

    if (!document) {
        return res.status(404).json({ "message": `No Document matches ID ${req.body.DocumentID}.` });
    }

    if (req.body?.DocumentID) document.DocumentID = req.body.DocumentID;
    if (req.body?.EmployeeID) document.EmployeeID = req.body.EmployeeID;
    if (req.body?.Description) document.Title = req.body.Title;
    if (req.body?.Description) document.Description = req.body.Description;
    if (req.body?.FileUrl) document.FileUrl = req.body.FileUrl;
    const result = await document.save();

    res.json(result);
}

const deleteDocument = async (req, res) => {
    if (!req?.body?.DocumentID) return res.status(400).json({ 'message': 'DocumentID required.' });

    const document = await Document.findOne({ DocumentID: req.body.DocumentID }).exec();
    if (!document) {
        return res.status(204).json({ "message": `No Document matches ID ${req.body.DocumentID}.` });
    }
    const result = await document.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getDocument = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'DocumentID required.' });

    const document = await Document.findOne({ DocumentID: req.params.id }).exec();
    if (!document) {
        return res.status(204).json({ "message": `No Document matches ID ${req.params.id}.` });
    }
    res.json(document);
}

module.exports = {
    getAllDocuments,
    createNewDocument,
    updateDocument,
    deleteDocument,
    getDocument
}