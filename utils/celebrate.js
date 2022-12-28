const { celebrate, Joi } = require('celebrate');

const signinCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
});

const userInfoCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const createMovieCheck = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().regex(/(http|https):\/\/([\w.]+\/?)\S*/),
    image: Joi.string().required().regex(/(http|https):\/\/([\w.]+\/?)\S*/),
    thumbnail: Joi.string().required().regex(/(http|https):\/\/([\w.]+\/?)\S*/),
  }),
});

const deleteMovieCheck = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  signinCheck,
  signupCheck,
  userInfoCheck,
  createMovieCheck,
  deleteMovieCheck,
};
