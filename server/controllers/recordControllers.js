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
  const file = req.file ? req.file.filename : req.body.cover;

  try {
    if (req.params.recordId) {
      // Update an existing record
      const recordId = req.params.recordId;
      const updatedRecord = await Record.updateOne(
        { _id: recordId },
        { $set: { ...req.body, cover: file } },
        { runValidators: true },
      );
      res.json(updatedRecord);
    } else {
      // Create a new record
      const newRecord = new Record({
        ...req.body,
        cover: file,
      });
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
  postCreateOrUpdateRecord,
};
