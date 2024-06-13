import { Schema, model, Document } from 'mongoose';

interface ICourse extends Document {
    title: string;
    description: string;
    duration: number;
    teacher: string;
    image: string;  // Adicionando o campo de imagem
}

const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    teacher: { type: String, required: true },
    image: { type: String }  // Adicionando o campo de imagem
});

const Course = model<ICourse>('Course', courseSchema);

export default Course;
