import mongoose from 'mongoose';

const yearRegex = /^(18(8[9]|9[0-9])|19\d{2}|20\d{2}|2099)$/;
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

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
      type: String,
      validate: {
        validator: function (v) {
          return yearRegex.test(v);
        },
        message: (props) =>
          `${props.value} must be a valid number between 1889 and ${nextYear}`,
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
      validate: {
        validator: function (v) {
          return yearRegex.test(v);
        },
        message: (props) =>
          `${props.value} must be a valid number between 1889 and ${nextYear}`,
      },
    },
    info: String,
    photo: String,
  },
  { timestamps: true },
);

const Records = mongoose.model('Records', RecordSchema);

export default Records;
