import createError from 'http-errors';
import { createLab, deleteLab, getAllLabs, getLabById, getLabsByUser, updateLab } from '@/repository/lab';

export const createLabService = async (labDetails) => {
  const lab = await createLab(labDetails);
  return lab;
};

export const getLabsByUserService = async (user) => {
  if (!user) throw new createError(404, 'User not found');

  if (user.role === 'ADMIN') {
    // If the user is an admin, fetch all labs
    const labs = await getAllLabsService();

    return labs;
  }

  let labs = [];

  if (user.role === 'LECTURER') {
    // If the user is a lecturer, fetch labs created by the lecturer
    labs = await getLabsByUser(user);
  } else if (user.role === 'STUDENT') {
    // If the user is a student, fetch labs assigned to the student
    labs = await getLabsByUser({ students: user._id });
  }
  return labs;
};

export const getAllLabsService = async () => {
  try {
    const labs = await getAllLabs({});
    return labs;
  } catch (error) {
    throw new createError(500, 'Error while fetching labs');
  }
};

export const getLabByIdService = async (labId) => {
  const lab = await getLabById(labId);
  if (!lab) throw new createError(404, 'Lab not found');
  return lab;
};

export const updateLabService = async (labId, labDetails) => {
  const updatedLab = await updateLab(labId, labDetails);
  if (!updatedLab) throw new createError(422, 'Invalid lab ID');
  return updatedLab;
};

export const deleteLabService = async (labId) => {
  const result = await deleteLab(labId);
  if (!result) throw new createError(422, 'Invalid lab ID');
};
