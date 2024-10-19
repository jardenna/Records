const express = require('express');
const router = express.Router();

const {
  getAllRecords,
  getRecordById,
  getNumOfRecords,
  postCreateRecord,
  postPhoto,
  postUpdateRecord,
  deleteRecord,
} = require('../controllers/recordControllers');
const utils = require('../utils/uploadImages');

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
module.exports = router;
