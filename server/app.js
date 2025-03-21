import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import RecordRoutes from './routes/RecordRoutes.js';
import authRouter from './routes/authRoutes.js';
import dbConnect from './utils/dbConnect.js';
dotenv.config();

const app = express();
const __dirname = path.resolve();

dbConnect();

const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Expires',
    'x-language',
  ],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cookieParser());
app.use(cors(corsOptions)); // Use the CORS middleware with options

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api/records', RecordRoutes);
app.use('/api/auth', authRouter);

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
