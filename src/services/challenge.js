import createError from 'http-errors';
import {
  createChallenge,
  findOneAndRemoveChallenge,
  findOneAndUpdateChallenge,
  getAllChallenges,
  getChallenge,
  getTestCases
} from '@/repository/challenge';

export const addNewChallenge = async (challengeDetails) => {
  const newChallenge = await createChallenge(challengeDetails);

  if (!newChallenge) {
    throw new createError(500, 'Internal server error encounted while cretaing the challenge');
  }

  return newChallenge;
};

export const getChallengeById = async (id) => {
  const challenge = await getChallenge({ _id: id });

  if (!challenge) {
    throw new createError(422, 'Invalid challenge ID');
  }

  return challenge;
};

export const getChallenges = (query) => {
  return getAllChallenges(query);
};

export const findAndUpdateChallange = async (id, challenge) => {
  const findChallenge = await getChallenge({ _id: id });

  if (!findChallenge) {
    throw new createError(422, 'Invalid challenge ID');
  }

  const updatedChallenge = findOneAndUpdateChallenge({ _id: id }, challenge);

  if (!updatedChallenge) {
    throw new createError(422, 'Invalid challenge ID');
  }

  return updatedChallenge;
};

export const findAndRemoveChallenge = async (id) => {
  const findChallenge = await getChallenge({ _id: id });

  if (!findChallenge) {
    throw new createError(422, 'Invalid challenge ID');
  }

  const removedChallenge = findOneAndRemoveChallenge({ _id: id });

  if (!removedChallenge) {
    throw new createError(422, 'Invalid challenge ID');
  }

  return removedChallenge;
};

export const getTestCasesOfChallenge = async (id) => {
  const findChallenge = await getChallenge({ _id: id });
  if (!findChallenge) {
    throw new createError(422, 'Invalid challenge ID');
  }

  const testCases = await getTestCases({ _id: id });
  if (!testCases) {
    throw new createError(422, 'Invalid challenge ID');
  }

  return testCases;
};
