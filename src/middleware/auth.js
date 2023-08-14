import { asyncHandler } from '@sliit-foss/functions';
import { isBlacklistedToken } from '@/repository/token';
import { getOneUser } from '@/repository/user';
import { decodeToken, makeResponse } from '@/utils';

export const protect = asyncHandler(async (req, res) => {
  const token = req.headers.authorization
    ? req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]?.replace('null', '')?.replace('undefined', '')
      : null
    : null;
  if (!token) return makeResponse({ res, status: 401, message: 'Unauthorized' });
  const isBackListedToken = isBlacklistedToken(token);
  if (isBackListedToken) return makeResponse({ res, status: 401, message: 'Unauthorized' });
  const decodedUser = decodeToken(token).data;
  const user = decodedUser ? await getOneUser({ _id: decodedUser._id }, false) : null;
  if (!user) return makeResponse({ res, status: 401, message: 'Unauthorized' });
  req.user_token = token;
  req.user = user;
});

export const authorizer = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole) || !userRole) {
      return makeResponse({ res, status: 403, message: 'You are not permitted to access this resource.' });
    }
    next();
  };
};
