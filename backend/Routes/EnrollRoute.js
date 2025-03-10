import { Router } from "express";

import EnrollController from "../Controller/EnrollController.js";


const router = Router();

router.get("/getEnrolls/:uid",EnrollController.getEnrolls);
router.post("/addNewEnroll",EnrollController.createEnroll);





export default router