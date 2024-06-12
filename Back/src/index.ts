import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import connectDB from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
