import mongoose from 'mongoose';

const yearRegex = /^(18|19|20)\d{2}$/;

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
        message: (props) => `${props.value} is not a valid Year!`,
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
    released: String,
    info: String,
    photo: String,
  },
  { timestamps: true },
);

const Records = mongoose.model('Records', RecordSchema);

export default Records;
