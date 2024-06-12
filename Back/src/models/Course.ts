import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  duration: number;
  teacher: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    teacher: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
