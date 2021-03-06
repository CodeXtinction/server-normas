import Joi from 'joi';

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export default {
  signup: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(passwordReg)
        .required(),
      name: Joi.string().required(),
      job: Joi.string()
    }
  }
};
