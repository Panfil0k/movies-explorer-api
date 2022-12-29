const router = require('express').Router();
const { userInfoCheck } = require('../utils/celebrate');
const { getAuthorizedUser, updateUserInfo } = require('../controllers/users');

router.get('/users/me', getAuthorizedUser);

router.patch('/users/me', userInfoCheck, updateUserInfo);

module.exports = router;
