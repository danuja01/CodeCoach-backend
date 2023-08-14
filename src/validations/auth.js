import { Joi } from 'celebrate';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const refreshTokenSchema = {
  refresh_token: Joi.string().required()
};

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/)
    .required()
    .error((errors) =>
      errors.map((err) => {
        if (err.code === 'string.pattern.base')
          err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`;
        return err;
      })
    ),
  university: Joi.string().required()
});

export const resendVerifyMailSchema = Joi.object({
  email: Joi.string().email().required()
});

export const forgotPasswordSchema = {
  email: Joi.string().email().required()
};

export const resetPasswordSchema = {
  new_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/)
    .required()
    .error((errors) =>
      errors.map((err) => {
        if (err.code === 'string.pattern.base')
          err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`;
        return err;
      })
    )
};

export const validUserResetPasswordSchema = {
  verification_code: Joi.string().required()
};

export const verifySchema = Joi.object({
  verification_code: Joi.string().required()
});
