import express from 'express';
import upload from '../utils/uploadImages.js';
const router = express.Router();

import {
  deleteRecord,
  getFirstSixRecords,
  getPaginatedRecords,
  getRecordById,
  postCreateRecord,
  postPhoto,
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

//post photo
router.post('/:recordId', upload.single('photo'), postPhoto);

//Add new record
// router.post('/', postCreateRecord);
router.post('/', upload.single('photo'), postCreateRecord);

//Delete Record
router.delete('/delete/:recordId', deleteRecord);

//Update record
router.put('/:recordId', postUpdateRecord);
export default router;
