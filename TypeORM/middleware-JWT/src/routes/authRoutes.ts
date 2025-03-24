import express from 'express';
import { login, register } from '../controllers/authController';
import { registerMiddleware, loginMiddleware } from '../middleware/auth';

const router = express.Router();


router.post('/register', registerMiddleware, register);
router.post('/login', loginMiddleware, login);

export default router;
