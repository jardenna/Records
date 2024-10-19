require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

const path = require('path');

const { PORT } = require('./config');

app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './', 'public')));

//import routes

const RecordRoutes = require('./routes/RecordRoutes');
const userRoutes = require('./routes/UserRoutes');

//Custom routes middleware
app.use('/records', RecordRoutes);
app.use('/user', userRoutes);
app.use('/', RecordRoutes);

mongoose
  .connect(
    `mongodb+srv://helle:${process.env.API_KEY}@cluster0-pimzw.mongodb.net/recordproject?retryWrites=true&w=majority` ||
      'mongodb://localhost/recordProject',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log('Mongo has conneced');
    return app.listen(PORT);
  });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
