const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { signinCheck, signupCheck } = require('../utils/celebrate');
const NotFoundError = require('../errors/NotFoundError');
const { MESSAGE_NOT_FOUND_ERROR } = require('../utils/constants');

router.post('/signin', signinCheck, login);

router.post('/signup', signupCheck, createUser);

router.use(auth);
router.use(usersRouter);
router.use(moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(MESSAGE_NOT_FOUND_ERROR));
});

module.exports = router;
