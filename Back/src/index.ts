import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import connectToDatabase from './config/database';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(bodyParser.json());

connectToDatabase();

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
