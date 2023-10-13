import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { createPost, deletePost, getAllPosts, getPostById, likePost, updatePost } from '@/controllers/post';
import { authorizer } from '@/middleware/auth';
import { createPostSchema, postIdSchema } from '@/validations/post';

const postRouter = express.Router();

postRouter.get('/', tracedAsyncHandler(getAllPosts));

postRouter.get('/:id', celebrate({ [Segments.PARAMS]: postIdSchema }), tracedAsyncHandler(getPostById));

postRouter.post(
  '/',
  celebrate({ [Segments.BODY]: createPostSchema }),
  authorizer(['ADMIN']),
  tracedAsyncHandler(createPost)
);

postRouter.put(
  '/:id',
  celebrate({ [Segments.PARAMS]: postIdSchema, [Segments.BODY]: createPostSchema }),
  authorizer(['ADMIN']),
  tracedAsyncHandler(updatePost)
);

postRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: postIdSchema }),
  authorizer(['ADMIN']),
  tracedAsyncHandler(deletePost)
);

postRouter.put('/like/:id', celebrate({ [Segments.PARAMS]: postIdSchema }), tracedAsyncHandler(likePost));

export default postRouter;
