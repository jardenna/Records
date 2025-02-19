import express from 'express';
import languageMiddleware from '../middleware/languageMiddleware.js';
import upload from '../utils/uploadImages.js';
const router = express.Router();

import {
  deleteRecord,
  getLatestSixRecords,
  getPaginatedRecords,
  getRecordById,
  postCreateOrUpdateRecord,
} from '../controllers/recordControllers.js';
import paginatedResults from '../middleware/paginatedResults.js';
import Record from '../models/RecordModel.js';

// Get all records
router.get('/', paginatedResults(Record), getPaginatedRecords);

// Get the Latest 6 records
router.get('/latestSix', getLatestSixRecords);

//Get record by Id
router.get('/:recordId', getRecordById);

// Update record
router.post('/:recordId', (req, res, next) => {
  upload.single('cover')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    postCreateOrUpdateRecord(req, res, next);
  });
});

// Create record
router.post('/', (req, res, next) => {
  upload.single('cover')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    postCreateOrUpdateRecord(req, res, next);
  });
});

// Delete record
router.delete('/delete/:recordId', languageMiddleware, deleteRecord);

export default router;
