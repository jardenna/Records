import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import RecordRoutes from './routes/RecordRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import dbConnect from './utils/dbConnect.js';
dotenv.config();

const app = express();
const __dirname = path.resolve();

dbConnect();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

//Custom routes middleware
app.use('/api/records', RecordRoutes);
app.use('/api/user', userRoutes);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log',
  );
});
