import express from 'express';
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

//Get the first 6 records
router.get('/firstSix', getLatestSixRecords);

//Get record by Id
router.get('/:recordId', getRecordById);

//post cover
router.post('/:recordId', upload.single('cover'), postCreateOrUpdateRecord);

//Create record
router.post('/', upload.single('cover'), postCreateOrUpdateRecord);

//Delete Record
router.delete('/delete/:recordId', deleteRecord);

export default router;
