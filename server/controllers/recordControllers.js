import Record from '../models/RecordsModel.js';

const getNumOfRecords = async (_, res) => {
  try {
    const latestRecords = await Record.find().sort({ _id: -1 }).limit(6);
    res.json(latestRecords);
  } catch (error) {
    res.status(201).json({ message: error });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const sortedRecords = await Record.find().sort([['date', -1]]);
    res.json(sortedRecords);
  } catch (error) {
    res.json({ message: error });
  }
};

const getRecordById = async (req, res) => {
  try {
    const { recordId } = req.params;
    const record = await Record.findById(recordId);
    res.json(record);
  } catch (error) {
    res.json({ message: error });
  }
};

//Post requests
const postCreateRecord = async (req, res) => {
  const {
    artist,
    title,
    prodYear,
    label,
    origin,
    price,
    recordNo,
    numOfRecords,
    released,
    info,
  } = req.body;
  const file = req.file ? req.file.filename : '';
  const record = new Record({
    artist,
    title,
    prodYear,
    label,
    origin,
    price,
    recordNo,
    numOfRecords,
    released,
    info,
    photo: file,
  });

  await record
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

const postPhoto = async (req, res) => {
  const file = req.file ? req.file.filename : req.body.photo;

  try {
    const record = await Record.updateOne(
      { _id: req.params.recordId },

      {
        $set: {
          photo: file,
        },
      },
    );
    res.json(record);
  } catch (error) {
    res.json({ message: error });
  }
};

const postUpdateRecord = async (req, res) => {
  try {
    const {
      artist,
      title,
      prodYear,
      label,
      origin,
      price,
      recordNo,
      numOfRecords,
      released,
      info,
    } = req.body;
    const updatedPost = await Record.updateOne(
      { _id: req.params.recordId },
      {
        $set: {
          artist,
          title,
          prodYear,
          label,
          origin,
          price,
          recordNo,
          numOfRecords,
          released,
          info,
        },
      },
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const removedPost = await Record.deleteOne({ _id: req.params.recordId });
    res.json(removedPost);
  } catch (error) {
    res.json({ message: error });
  }
};

export {
  deleteRecord,
  getAllRecords,
  getNumOfRecords,
  getRecordById,
  postCreateRecord,
  postPhoto,
  postUpdateRecord,
};
