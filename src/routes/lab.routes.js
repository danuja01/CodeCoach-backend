import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { createLab, deleteLab, getLabById, getLabsByUser, updateLab } from '@/controllers/lab';
import { authorizer } from '@/middleware/auth';
import { createLabSchema, labIdSchema, updateLabSchema } from '@/validations/lab';

const labRouter = express.Router();

labRouter.post(
  '/',
  celebrate({ [Segments.BODY]: createLabSchema }),
  authorizer(['LECTURER']),
  tracedAsyncHandler(createLab)
);

labRouter.get('/', authorizer(['ADMIN', 'LECTURER', 'STUDENT']), tracedAsyncHandler(getLabsByUser));

labRouter.get(
  '/:id',
  authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
  celebrate({ [Segments.PARAMS]: labIdSchema }),
  tracedAsyncHandler(getLabById)
);

labRouter.put(
  '/:id',
  celebrate({ [Segments.PARAMS]: labIdSchema, [Segments.BODY]: updateLabSchema }),
  authorizer(['LECTURER']),
  tracedAsyncHandler(updateLab)
);

labRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: labIdSchema }),
  authorizer(['LECTURER']),
  tracedAsyncHandler(deleteLab)
);

export default labRouter;
