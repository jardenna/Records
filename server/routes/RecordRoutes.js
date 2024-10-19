import express from 'express';
import utils from '../utils/uploadImages';
const router = express.Router();

import {
  deleteRecord,
  getAllRecords,
  getNumOfRecords,
  getRecordById,
  postCreateRecord,
  postPhoto,
  postUpdateRecord,
} from '../controllers/recordControllers';

//Get the first 6 records
router.get('/', getNumOfRecords);

// Get all records
router.get('/', getAllRecords);

//Get record by Id
router.get('/:recordId', getRecordById);

//post photo
router.post('/:recordId', utils.upload.single('photo'), postPhoto);

//Add new record
router.post('/', utils.upload.single('photo'), postCreateRecord);

//Delete Record
router.delete('/delete/:recordId', deleteRecord);

//Update record
router.put('/:recordId', postUpdateRecord);
export default router;
