/* eslint-disable indent */
const Joi = require('@hapi/joi');

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      name: Joi.string()
        .max(255)
        .required(),
      email: Joi.string()
        .max(255)
        .min(4)
        .required()
        .email(),
      password: Joi.string()
        .required()
        .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})'))
      //REGEX: 'A password must atleast contain a letter, a capital letter, a number and must be between 8 and 32 characters long'
    });
    // Error handling
    const { error } = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'A name is required'
          });
          break;
        case 'email':
          res.status(400).send({
            error: 'A valid email is required'
          });
          break;
        case 'password':
          res.status(400).send({
            error:
              'A password must atleast contain a letter, a capital letter, a number and must be between 8 and 32 characters long'
          });
          break;
        default:
          res.status(400).send({
            error: 'Something went wrong'
          });
          break;
      }
    } else {
      next();
    }
  },
  login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    } else {
      next();
    }
  }
};
