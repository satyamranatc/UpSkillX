import { Router } from "express";
import CourseController from "../Controller/CourseController.js";

const router = Router();

router.get('/', CourseController.getAllCourses);




export default router;