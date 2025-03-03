import { Router } from "express";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import CourseController from "../Controller/CourseController.js";

const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:cid', CourseController.getAllCourses);
router.post('/',adminMiddleware, CourseController.createCourse);
router.put('/:id', adminMiddleware,CourseController.updateCourse);
router.delete('/:id',adminMiddleware, CourseController.deleteCourse);






export default router;