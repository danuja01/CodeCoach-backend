import express from 'express';
// eslint-disable-next-line import/order
import { protect } from '@/middleware/auth';
import authRouter from './auth.routes';
import labRouter from './lab.routes';
import submissionRouter from './submission.routes';
import userRouter from './user.routes';
import challengeRouter from './challenge.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', protect, userRouter);
router.use('/labs', protect, labRouter);
router.use('/submissions', protect, submissionRouter);
router.use('/challenges', protect, challengeRouter);

export default router;
