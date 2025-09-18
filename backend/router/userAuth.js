import express from 'express';
import { userLogin, userRegister } from '../controller/userController.js';

const router = express.Router()

router.post('/register' , userRegister)
router.post('/login' , userLogin)
export default router