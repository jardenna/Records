import mongoose from 'mongoose';
import { yearRegex } from '../utils/regex.js';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
const minimumYear = 1889;

const RecordSchema = new mongoose.Schema(
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
      type: String,
      validate: {
        validator: function (v) {
          return yearRegex.test(v);
        },
        message: (props) =>
          `${props.value} must be a number between ${minimumYear} and ${nextYear}`,
      },
      required: [true, 'Please enter a production year'],
    },
    label: String,
    origin: String,
    price: {
      type: String,
      default: '',
    },
    recordNo: String,
    numOfRecords: {
      type: Number,
      default: 1,
    },

    released: {
      type: String,
      validator: function (v) {
        return yearRegex.test(v);
      },
    },
    info: String,
    cover: String,
  },
  { timestamps: true },
);

// Middleware for validating 'released'
RecordSchema.pre('save', function (next) {
  const prodYear = parseInt(this.prodYear, 10);
  const year = parseInt(this.released, 10);
  if (year !== 0) {
    // Skip validation if the field is empty
    if (year < minimumYear || year < prodYear) {
      return next(
        new Error(
          `Released year ${this.released} must be between ${prodYear} and ${nextYear}.`,
        ),
      );
    }
  }
  next();
});

const Records = mongoose.model('Records', RecordSchema);

export default Records;
