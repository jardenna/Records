import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import RecordRoutes from './routes/RecordRoutes.js';
import userRoutes from './routes/UserRoutes.js';
dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

//Custom routes middleware
app.use('/records', RecordRoutes);
app.use('/user', userRoutes);
app.use('/', RecordRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_PASSWORD}:${process.env.MONGO_URI}@cluster0-pimzw.mongodb.net/${process.env.PROJECT_NAME}?retryWrites=true&w=majority` || {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Mongo has conneced');
    return app.listen(PORT);
  });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
