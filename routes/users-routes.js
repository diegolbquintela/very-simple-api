const express = require('express');
const expressValidator = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const HttpError = require('../models/http-error');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  [
    expressValidator.check('name').not().isEmpty(),
    expressValidator.check('email').normalizeEmail().isEmail(),
    expressValidator.check('password').isLength({ min: 6 }),
  ],
  usersControllers.signup
);

router.post('/login', usersControllers.login);

module.exports = router;
