import { Router } from "express";

import UserController from "../Controller/UserController.js";


const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

router.post('/login', UserController.loginUser);
router.post('/signup', UserController.createUser);

router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);




export default router