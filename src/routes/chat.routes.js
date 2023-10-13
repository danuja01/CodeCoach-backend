import { Router } from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { sendChatController } from '@/controllers/ai_chat';

const aiChatRouter = Router();

aiChatRouter.post('/', tracedAsyncHandler(sendChatController));

export default aiChatRouter;
