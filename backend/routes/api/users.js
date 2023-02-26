const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res, next) => {

    const { email, password, username, firstName, lastName } = req.body;
    let user
    try {
    user = await User.signup({ email, username, password, firstName, lastName });
    }
    catch(e) {
      let err = new Error('User already exists');
      err.status = 403;
      err.errors = {};
      if (e.errors[0].path == 'username') err.errors.username = 'User with that username already exists';
      else err.errors.email = 'User with that email already exists';
      next(err)
    }

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);

module.exports = router;
