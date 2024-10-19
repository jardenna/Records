const mongoose = require('mongoose');

const regex = require('../utils/regex');
const { YEAR_REGEX } = regex;

const a = /^(18|19|20)\d{2}$/;

const RecordSchema = mongoose.Schema(
  {
    artist: {
      type: String,
      required: [true, 'Please enter an artist name'],
    },
    title: {
      type: String,
      required: [true, 'Please enter a title'],
    },
    prodYear: {
      type: Number,
      validate: {
        validator: function (v) {
          return YEAR_REGEX.test(v);
        },
        message: (props) => `${props.value} is not a valid Year!`,
      },
      required: [true, 'Please enter a production year'],
    },
    label: String,
    origin: String,
    price: {
      type: Number,
      default: '',
    },
    recordNo: String,
    numOfRecords: {
      type: Number,
      default: 1,
    },
    released: Number,
    info: String,
    photo: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Records', RecordSchema);
