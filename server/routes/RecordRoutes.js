import express from 'express';
import upload from '../utils/uploadImages.js';
const router = express.Router();

import {
  deleteRecord,
  getFirstSixRecords,
  getPaginatedRecords,
  getRecordById,
  postCover,
  postCreateRecord,
  postUpdateRecord,
} from '../controllers/recordControllers.js';
import paginatedResults from '../middleware/paginatedResults.js';
import Record from '../models/RecordsModel.js';

// Get all records
router.get('/', paginatedResults(Record), getPaginatedRecords);

//Get the first 6 records
router.get('/firstSix', getFirstSixRecords);

//Get record by Id
router.get('/:recordId', getRecordById);

//post cover
router.post('/:recordId', upload.single('cover'), postCover);

//Add new record
// router.post('/', postCreateRecord);
router.post('/', upload.single('cover'), postCreateRecord);

//Delete Record
router.delete('/delete/:recordId', deleteRecord);

//Update record
router.put('/:recordId', postUpdateRecord);
export default router;
