import fs from 'fs';
import path from 'path';
import Record from '../models/RecordsModel.js';

const getFirstSixRecords = async (_, res) => {
  try {
    const latestRecords = await Record.find().sort({ _id: -1 }).limit(6);
    res.json({ results: latestRecords });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaginatedRecords = async (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecordById = async (req, res) => {
  try {
    const { recordId } = req.params;
    const record = await Record.findById(recordId);
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postCreateOrUpdateRecord = async (req, res) => {
  try {
    const file = req.file ? req.file.filename : req.body.cover;

    if (req.params.recordId) {
      // Update an existing record
      const recordId = req.params.recordId;
      const existingRecord = await Record.findById(recordId);

      if (!existingRecord) {
        return res.status(404).json({ message: 'Record not found' });
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
            console.log(error);
          });
        }
      }

      // Update the record
      const updatedRecord = await Record.updateOne(
        { _id: recordId },
        { $set: { ...req.body, cover: file } },
        { runValidators: true },
      );

      return res.json(updatedRecord);
    }

    // Create a new record
    const newRecord = new Record({
      ...req.body,
      cover: file,
    });

    const savedRecord = await newRecord.save();
    res.json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({ _id: req.params.recordId });

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    if (record.cover) {
      const imagePath = path.join(
        process.cwd(),
        'public/images/uploads',
        record.cover,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (error) => {
          if (error) {
            console.error('Error deleting image:', error);
          } else {
            console.log('Image deleted:', imagePath);
          }
        });
      }
    }

    res.json({ message: 'Record and image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  deleteRecord,
  getFirstSixRecords,
  getPaginatedRecords,
  getRecordById,
  postCreateOrUpdateRecord,
};
