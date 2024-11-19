import { Router } from 'express';
import { authRoute } from './authRoutes';
import authMiddleware from '../middleware/auth';

const router = Router();

router.use('/auth',authRoute)
router.use('/home',authMiddleware)

export default router