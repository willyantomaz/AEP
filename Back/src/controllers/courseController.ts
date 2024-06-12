import { Request, Response } from 'express';
import Course, { ICourse } from '../models/Course';

export const createCourse = async (req: Request, res: Response) => {
  const { title, description, duration, teacher } = req.body;

  try {
    const course = new Course({ title, description, duration, teacher });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, duration, teacher } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { title, description, duration, teacher },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
