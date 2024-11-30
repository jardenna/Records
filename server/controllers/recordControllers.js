import Record from '../models/RecordsModel.js';

const getAmountOfRecords = async (req, res) => {
  try {
    const count = await Record.countDocuments(); // Retrieve the count
    res.status(200).json({ totalAmountRecords: count }); // Send the count in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFirstSixRecords = async (_, res) => {
  try {
    const latestRecords = await Record.find().sort({ _id: -1 }).limit(6);
    res.json(latestRecords);
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
  const recordData = {
    ...req.body,
  };

  try {
    const record = new Record(recordData);
    const savedRecord = await record.save();
    res.json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postPhoto = async (req, res) => {
  const file = req.file ? req.file.filename : req.body.photo;

  try {
    const record = await Record.updateOne(
      { _id: req.params.recordId },
      { $set: { photo: file } },
    );
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUpdateRecord = async (req, res) => {
  const updatedData = { ...req.body };

  try {
    const updatedRecord = await Record.updateOne(
      { _id: req.params.recordId },
      { $set: updatedData },
    );
    res.json(updatedRecord);
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
  getAmountOfRecords,
  getFirstSixRecords,
  getPaginatedRecords,
  getRecordById,
  postCreateRecord,
  postPhoto,
  postUpdateRecord,
};
