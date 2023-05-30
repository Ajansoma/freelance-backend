const express = require('express');
const verifyToken = require('../../middleware/jwt');

const messageRouter = express.Router();

const { httpSendMessage, httpGetMessages } = require('./message.controller');

messageRouter.post('/', verifyToken, httpSendMessage);
messageRouter.get('/:id', verifyToken, httpGetMessages);
module.exports = { messageRouter };
