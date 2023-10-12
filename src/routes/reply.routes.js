import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate, Segments } from 'celebrate';
import { createReply, getReplies, deleteReply, updateReply } from '@/controllers/reply';
import { authorizer } from '@/middleware/auth';
import { createReplySchema } from '@/validations/reply';

const replyRouter = express.Router();

// Route for creating a reply
replyRouter.post(
    '/create/:id',
    celebrate({ [Segments.BODY]: createReplySchema }),
    authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
    tracedAsyncHandler(createReply)
);

// Route for getting replies for a post
replyRouter.get(
    '/get/:id',
    authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
    tracedAsyncHandler(getReplies)
);

// Route for deleting a reply
replyRouter.delete(
    '/delete/:id',
    authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
    tracedAsyncHandler(deleteReply)
);

// Route for updating a reply
replyRouter.put(
    '/update/:id',
    celebrate({ [Segments.BODY]: createReplySchema }),
    authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
    tracedAsyncHandler(updateReply)
);

export default replyRouter;
