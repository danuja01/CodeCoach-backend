import { addNewAdminUser, changeAdminPasswordService, getUserByID, getUsers, updateUserdetails } from '@/services/user';
import { makeResponse } from '@/utils';

export const createAdmin = async (req, res) => {
  const user = await addNewAdminUser(req.body);
  return makeResponse({ res, data: user, message: 'User added successfully' });
};

export const getAll = async (req, res) => {
  const users = await getUsers(req.query);
  return makeResponse({ res, data: users, message: 'Users retrieved succesfully' });
};

export const getById = async (req, res) => {
  const user = await getUserByID(req.params.id);
  return makeResponse({ res, data: user, message: 'User retrieved succesfully' });
};

export const update = async (req, res) => {
  const user = await updateUserdetails(req.params.id, req.user, req.body);
  return makeResponse({ res, data: user, message: 'User updated successfully' });
};

export const changeAdminPassword = async (req, res) => {
  await changeAdminPasswordService(req.user, req.body.old_password, req.body.new_password);
  return makeResponse({ res, message: 'Password changed successfully' });
};
