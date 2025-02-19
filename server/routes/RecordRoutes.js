import express from 'express';
import handleFileUpload from '../middleware/fileUploadMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
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
router.post('/:recordId', handleFileUpload, postCreateOrUpdateRecord);

// Create record
router.post('/', handleFileUpload, postCreateOrUpdateRecord);

// Delete record
router.delete('/delete/:recordId', languageMiddleware, deleteRecord);

export default router;
