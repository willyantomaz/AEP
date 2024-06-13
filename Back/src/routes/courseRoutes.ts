import { Router } from 'express';
import { CourseController } from '../controllers/courseController';
import multer from 'multer';

const router = Router();
const courseController = new CourseController();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', courseController.getCourses);
router.post('/', upload.single('image'), courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;
