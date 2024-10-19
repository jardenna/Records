dotenv.config({ path: path.join('..', '.env') });
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import RecordRoutes from './routes/RecordRoutes';
import userRoutes from './routes/UserRoutes';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './', 'public')));

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
