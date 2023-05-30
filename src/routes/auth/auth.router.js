const express = require('express');

const authRouter = express.Router();

const {
  postRegisterController,
  postLoginController,
  postLogOutController,
} = require('./auth.contoller');

authRouter.post('/register', postRegisterController);
authRouter.post('/login', postLoginController);
authRouter.post('/logout', postLogOutController);

module.exports = { authRouter };
