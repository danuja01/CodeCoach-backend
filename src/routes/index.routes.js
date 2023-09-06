import express from 'express';
// eslint-disable-next-line import/order
import { protect } from '@/middleware/auth';
import authRouter from './auth.routes';
import submissionRouter from './submission.routes';
import userRouter from './user.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', protect, userRouter);
router.use('/submissions', protect, submissionRouter);

export default router;
