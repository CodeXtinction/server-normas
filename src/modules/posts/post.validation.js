import Joi from 'joi';

export default {
  createPost: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      description: Joi.string()
        .min(100)
        .required(),
      tipo: Joi.string().required(),
      institucion: Joi.string().required(),
      principio: Joi.string().required(),
      instrumento: Joi.string().required(),
      iniciativa: Joi.string().required(),
      nombre: Joi.string().required(),
      ocupacion: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      telefono: Joi.string().required()
    }
  }
};
