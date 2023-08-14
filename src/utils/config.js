import dotenv from 'dotenv';

dotenv.config();

export const MAIL_CREDENTIALS = {
  USER: process.env.MAIL_USER,
  PASS: process.env.MAIL_PASS
};
