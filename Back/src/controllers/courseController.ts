import { Request, Response } from 'express';
import Course from '../models/Course';

export class CourseController {
    public async getCourses(req: Request, res: Response): Promise<void> {
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter cursos', error });
        }
    }

    public async createCourse(req: Request, res: Response): Promise<void> {
        const { title, description, duration, teacher } = req.body;
        let image: string | undefined;

        if (req.file) {
            image = req.file.buffer.toString('base64');
        }

        try {
            const newCourse = new Course({ title, description, duration, teacher, image });
            await newCourse.save();
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar curso', error });
        }
    }

    public async updateCourse(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { title, description, duration, teacher } = req.body;

        try {
            const course = await Course.findById(id);
            if (!course) {
                res.status(404).json({ message: 'Curso não encontrado' });
                return;
            }

            course.title = title;
            course.description = description;
            course.duration = duration;
            course.teacher = teacher;

            await course.save();
            res.json(course);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar curso', error });
        }
    }

    public async deleteCourse(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const course = await Course.findByIdAndDelete(id);
            if (!course) {
                res.status(404).json({ message: 'Curso não encontrado' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir curso', error });
        }
    }
}
