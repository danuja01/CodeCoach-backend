import {
  addNewChallenge,
  findAndRemoveChallenge,
  findAndUpdateChallange,
  getChallengeById,
  getChallenges,
  getTestCasesOfChallenge
} from '@/services/challenge';
import { makeResponse } from '@/utils';

export const createChallenge = async (req, res) => {
  const newChallenge = await addNewChallenge(req.body);
  return makeResponse({ res, data: newChallenge, message: 'Challenge added succesfully' });
};

export const getById = async (req, res) => {
  const challenge = await getChallengeById(req.params.id);
  return makeResponse({ res, data: challenge, message: 'Challenge retrieved succesfully' });
};

export const getAll = async (req, res) => {
  const challenges = await getChallenges(req.query);
  return makeResponse({ res, data: challenges, message: 'Challenges retrieved succesfully' });
};

export const updateChallenge = async (req, res) => {
  const challenge = await findAndUpdateChallange(req.params.id, req.body);
  return makeResponse({ res, data: challenge, message: 'Challenge updated succesfully' });
};

export const removeChallenge = async (req, res) => {
  const challenge = await findAndRemoveChallenge(req.params.id);
  return makeResponse({ res, data: challenge, message: 'Challenge removed succesfully' });
};

export const getTestCases = async (req, res) => {
  const testCases = await getTestCasesOfChallenge(req.params.id);
  return makeResponse({
    res,
    data: testCases,
    message: 'test cases of the challenge retrieved succesfully'
  });
};
