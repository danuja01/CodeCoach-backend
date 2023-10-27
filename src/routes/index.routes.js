import express from 'express';
// eslint-disable-next-line import/order
import { protect } from '@/middleware/auth';
import authRouter from './auth.routes';
import challengeRouter from './challenge.routes';
import aiChatRouter from './chat.routes';
import labRouter from './lab.routes';
import postRouter from './post.routes';
import replyRouter from './reply.routes';
import submissionRouter from './submission.routes';
import userRouter from './user.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', protect, userRouter);
router.use('/labs', protect, labRouter);
router.use('/submissions', protect, submissionRouter);
router.use('/challenges', protect, challengeRouter);
router.use('/labs', protect, labRouter);
router.use('/posts', protect, postRouter);
router.use('/replies', protect, replyRouter);
router.use('/chat', protect, aiChatRouter);

export default router;
