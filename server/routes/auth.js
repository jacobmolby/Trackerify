const router = require('express').Router();

const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');
const AuthenticationController = require('../controllers/AuthenticationController');

router.post(
  '/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register
);

router.post(
  '/login',
  AuthenticationControllerPolicy.login,
  AuthenticationController.login
);

module.exports = router;
