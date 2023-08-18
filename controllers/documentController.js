const Document = require('../models/Document');
const Employee = require('../models/Employee');

const documentController = {
  // Create a new document for an employee
  createDocument: async (req, res) => {
    try {
      const { title, fileURL, uploadDate, employeeId } = req.body;
      
      // Check if the employee exists
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      const documentData = {
        title,
        fileURL,
        uploadDate,
        employee: employeeId
      };

      const document = new Document(documentData);
      await document.save();

      // Add the document to the employee's documents array
      employee.documents.push(document._id);
      await employee.save();

      res.status(201).send(document);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  // Get all documents for an employee
  getAllDocumentsForEmployee: async (req, res) => {
    const employeeId = req.params.employeeId;

    try {
      const documents = await Document.find({ employee: employeeId });
      res.status(200).send(documents);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get document by ID
  getDocumentById: async (req, res) => {
    const id = req.params.id;

    try {
      const document = await Document.findById(id);
      if (!document) {
        return res.status(404).send({ error: 'Document not found' });
      }
      res.status(200).send(document);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Update document by ID
  updateDocument: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;

      const document = await Document.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
      });

      if (!document) {
        return res.status(404).send({ error: 'Document not found' });
      }

      res.status(200).send(document);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  // Delete document by ID
  deleteDocument: async (req, res) => {
    try {
      const id = req.params.id;
      const document = await Document.findByIdAndDelete(id);

      if (!document) {
        return res.status(404).send({ error: 'Document not found' });
      }

      res.status(200).send(document);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  }
};

module.exports = documentController;
