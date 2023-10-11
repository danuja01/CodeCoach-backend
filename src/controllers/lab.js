import {
  createLabService,
  deleteLabService,
  getAllLabsService,
  getLabByIdService,
  getLabsByUserService,
  updateLabService
} from '@/services/lab';
import { makeResponse } from '@/utils';

export const createLab = async (req, res) => {
  const lab = await createLabService(req.body);
  return makeResponse({ res, data: lab, message: 'Lab created successfully' });
};

export const getAllLabs = async (_req, res) => {
  const labs = await getAllLabsService();
  return makeResponse({ res, data: labs, message: 'All labs retrieved successfully' });
};

export const getLabsByUser = async (req, res) => {
  const labs = await getLabsByUserService(req.user);
  return makeResponse({ res, data: labs, message: 'Labs retrieved by user successfully' });
};

export const getLabById = async (req, res) => {
  const lab = await getLabByIdService(req.params.id);
  return makeResponse({ res, data: lab, message: 'Lab retrieved successfully' });
};

export const updateLab = async (req, res) => {
  const lab = await updateLabService(req.params.id, req.body);
  return makeResponse({ res, data: lab, message: 'Lab updated successfully' });
};

export const deleteLab = async (req, res) => {
  await deleteLabService(req.params.id);
  return makeResponse({ res, message: 'Lab deleted successfully' });
};
