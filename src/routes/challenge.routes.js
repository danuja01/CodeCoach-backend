import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate/lib';
import {
  createChallenge,
  getAll,
  getById,
  getTestCases,
  removeChallenge,
  updateChallenge
} from '@/controllers/challenge';
import { authorizer } from '@/middleware';
import { addChallengeSchema, challengeIdSchema, updateChallengeSchema } from '@/validations/challenge';

const challengeRouter = express.Router();

challengeRouter.post(
  '/',
  celebrate({ [Segments.BODY]: addChallengeSchema }),
  authorizer(['ADMIN', 'LECTURER']),
  tracedAsyncHandler(createChallenge)
);

challengeRouter.get(
  '/testCases/:id',
  celebrate({ [Segments.PARAMS]: challengeIdSchema }),
  authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
  tracedAsyncHandler(getTestCases)
);

challengeRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: challengeIdSchema }),
  authorizer(['ADMIN', 'LECTURER', 'STUDENT']),
  tracedAsyncHandler(getById)
);

challengeRouter.get('/', authorizer(['ADMIN', 'LECTURER', 'STUDENT']), tracedAsyncHandler(getAll));

challengeRouter.put(
  '/:id',
  celebrate({ [Segments.PARAMS]: challengeIdSchema, [Segments.BODY]: updateChallengeSchema }),
  authorizer(['ADMIN', 'LECTURER']),
  tracedAsyncHandler(updateChallenge)
);

challengeRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: challengeIdSchema }),
  authorizer(['ADMIN', 'LECTURER']),
  tracedAsyncHandler(removeChallenge)
);

export default challengeRouter;
