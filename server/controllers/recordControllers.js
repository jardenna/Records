import fs from 'fs';
import path from 'path';
import Record from '../models/RecordModel.js';
import { t } from '../utils/translator.js';

// @desc    Get the latest six records
// @route   Get /api/records/latestSix
// @access  Private
const getLatestSixRecords = async (_, res) => {
  try {
    const latestRecords = await Record.find().sort({ _id: -1 }).limit(6);
    res.status(200).json({ results: latestRecords });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get paginated records
// @route   Get /api/records
// @access  Private
const getPaginatedRecords = async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a record by ID
// @route   Get /api/records/recordId
// @access  Private
const getRecordById = async (req, res) => {
  try {
    const { recordId } = req.params;
    const record = await Record.findById(recordId);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update a record.
// @route   Post /api/records
// @access  Private
const postCreateOrUpdateRecord = async (req, res) => {
  try {
    const file = req.file ? req.file.filename : req.body.cover;

    if (req.params.recordId) {
      // Update an existing record
      const recordId = req.params.recordId;
      const existingRecord = await Record.findById(recordId);

      if (!existingRecord) {
        return res.status(404).json({ message: t('albumNotFound', req.lang) });
      }

      // If a new file is uploaded, delete the old one
      if (req.file && existingRecord.cover) {
        const oldImagePath = path.join(
          process.cwd(),
          'public/images/uploads',
          existingRecord.cover,
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (error) => {
            if (error) {
              console.error('Error deleting old image:', error);
            }
          });
        }
      }

      // Update the record
      const updatedRecord = await Record.updateOne(
        { _id: recordId },
        {
          $set: {
            ...req.body,
            cover: file,
          },
        },
        { runValidators: true },
      );

      return res.status(200).json(updatedRecord);
    }

    // Create a new record
    const newRecord = new Record({
      ...req.body,
      cover: file,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a record.
// @route   Delete /api/records/delete/recordId
// @access  Private

const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({ _id: req.params.recordId });

    if (!record) {
      return res.status(404).json({ message: t('albumNotFound', req.lang) });
    }

    if (record.cover) {
      const imagePath = path.join(
        process.cwd(),
        'public/images/uploads',
        record.cover,
      );

      fs.unlink(imagePath, (error) => {
        if (error) {
          return res.status(500).json({ message: 'Error deleting image' });
        } else {
          return res.status(200).json({ message: t('albumDeleted', req.lang) });
        }
      });
    } else {
      return res.status(200).json({ message: t('albumDeleted', req.lang) });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  deleteRecord,
  getLatestSixRecords,
  getPaginatedRecords,
  getRecordById,
  postCreateOrUpdateRecord,
};
