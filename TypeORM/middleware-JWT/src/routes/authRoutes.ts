import express from 'express';
import { login, register, home} from '../controllers/authController';
import { registerMiddleware, loginMiddleware } from '../middleware/authentication';
import { authorizeMiddleware } from '../middleware/authorization';

const router = express.Router();


router.post('/register', registerMiddleware, register);
router.post('/login', loginMiddleware, login);
router.get('/home', authorizeMiddleware, home)



export default router;
