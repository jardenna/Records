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

// Post requests
const postCreateRecord = async (req, res) => {
  const file = req.file ? req.file.filename : req.body.cover;

  try {
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

const postCover = async (req, res) => {
  const file = req.file ? req.file.filename : req.body.cover;

  try {
    const recordId = req.params.recordId;

    if (recordId) {
      // Update existing record
      const record = await Record.updateOne(
        { _id: recordId },
        { $set: { cover: file } },
      );
      res.json(record);
    } else {
      // Create new record
      const newRecord = new Record({ cover: file, ...req.body });
      const savedRecord = await newRecord.save();
      res.json(savedRecord);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const removedRecord = await Record.deleteOne({ _id: req.params.recordId });
    res.json(removedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  deleteRecord,
  getFirstSixRecords,
  getPaginatedRecords,
  getRecordById,
  postCover,
  postCreateRecord,
};
