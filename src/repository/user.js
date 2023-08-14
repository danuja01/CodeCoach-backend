import { moduleLogger } from '@sliit-foss/module-logger';
import { User } from '@/models';

const logger = moduleLogger('User-Repository');

export const createUser = async (user) => {
  const newUser = (await new User(user).save()).toObject();
  delete newUser.password;
  return newUser;
};

export const getAllUsers = ({ sort = {}, filter = {}, page = 1, limit = 10 }) => {
  const options = {
    page,
    limit
  };

  if (Object.keys(sort).length > 0) options.sort = sort;

  const aggregateQuery = () =>
    User.aggregate([
      {
        $match: filter
      },
      {
        $project: {
          password: 0
        }
      }
    ]);

  return (page ? User.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
    logger.error(`An error occurred when retrieving users - err: ${err.message}`);
    throw err;
  });
};

export const getOneUser = async (filters, returnPassword = false) => {
  const user = await User.findOne(filters).lean();
  if (!user) return null;

  if (!returnPassword) delete user.password;
  return user;
};

export const findOneAndUpdateUser = async (filters, data) => {
  const user = await User.findOneAndUpdate(filters, data, { new: true }).lean();
  if (!user) return null;

  delete user.password;
  return user;
};

export const findOneAndRemoveUser = (filters) => {
  return User.findOneAndRemove(filters);
};
