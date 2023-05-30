const express = require('express');

const userRouter = express.Router();

const { deleteUserController, getUserContoller } = require('./user.controller');
const verifyToken = require('../../middleware/jwt');

userRouter.get('/:id', verifyToken, getUserContoller);
userRouter.delete('/:id', verifyToken, deleteUserController);

module.exports = { userRouter };
