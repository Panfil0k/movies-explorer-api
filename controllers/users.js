const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictRequestError = require('../errors/ConflictRequestError');
const {
  OK_STATUS,
  CREATED_STATUS,
  MESSAGE_REQUEST_ERROR,
  MESSAGE_NOT_FOUND_ERROR,
  MESSAGE_CONFLICT_REQUEST_ERROR,
} = require('../utils/constants');

const {
  SALT, NODE_ENV, JWT_SECRET, KEY_SECRET,
} = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;

  bcrypt.hash(req.body.password, SALT)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(CREATED_STATUS).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictRequestError(MESSAGE_CONFLICT_REQUEST_ERROR));
      } else if (err.name === 'ValidationError') {
        next(new RequestError(MESSAGE_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

const getAuthorizedUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(OK_STATUS).send(user);
      }
      throw new NotFoundError(MESSAGE_NOT_FOUND_ERROR);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(MESSAGE_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError(MESSAGE_NOT_FOUND_ERROR);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictRequestError(MESSAGE_CONFLICT_REQUEST_ERROR));
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new RequestError(MESSAGE_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : KEY_SECRET, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser, getAuthorizedUser, updateUserInfo, login,
};
