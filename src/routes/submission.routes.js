import { Router } from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { createSubmission, getOneSubmission, getSubmissionById, viewSubmissions } from '@/controllers/submission';
import { submissionCreateSchema, submissionIdSchema, submissionViewSchema } from '@/validations/submission';

const submissionRouter = Router();

submissionRouter.post(
  '/',
  celebrate({ [Segments.BODY]: submissionCreateSchema }),
  tracedAsyncHandler(createSubmission)
);

submissionRouter.get('/', celebrate({ [Segments.QUERY]: submissionViewSchema }), tracedAsyncHandler(viewSubmissions));

submissionRouter.get('/one', tracedAsyncHandler(getOneSubmission));

submissionRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: submissionIdSchema }),
  tracedAsyncHandler(getSubmissionById)
);

export default submissionRouter;
