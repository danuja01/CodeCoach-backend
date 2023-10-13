import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { createLab, deleteLab, getAllLabs, getLabById, getLabsByUser, updateLab } from '@/controllers/lab';
import { authorizer } from '@/middleware/auth';
import { createLabSchema, labIdSchema, updateLabSchema } from '@/validations/lab';

const labRouter = express.Router();

labRouter.post(
  '/',
  celebrate({ [Segments.BODY]: createLabSchema }),
  authorizer(['LECTURER', 'ADMIN']),
  tracedAsyncHandler(createLab)
);

labRouter.get('/', authorizer(['ADMIN', 'LECTURER', 'STUDENT']), tracedAsyncHandler(getLabsByUser));

labRouter.get('/all', authorizer(['ADMIN', 'LECTURER', 'STUDENT']), async (req, res) => {
  try {
    await getAllLabs(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

labRouter.get(
  '/:id',
  authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
  celebrate({ [Segments.PARAMS]: labIdSchema }),
  tracedAsyncHandler(getLabById)
);

labRouter.put(
  '/:id',
  celebrate({ [Segments.PARAMS]: labIdSchema, [Segments.BODY]: updateLabSchema }),
  authorizer(['LECTURER', 'ADMIN']),
  tracedAsyncHandler(updateLab)
);

labRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: labIdSchema }),
  authorizer(['LECTURER', 'ADMIN']),
  tracedAsyncHandler(deleteLab)
);

export default labRouter;
