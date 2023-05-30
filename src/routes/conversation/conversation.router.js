const express = require('express');
const verifyToken = require('../../middleware/jwt');

const conversationRouter = express.Router();

const {
  httpSendConversation,
  httpGetConversation,
  httpGetConversations,
  httpUpdateConversations,
} = require('./conversation.controller');

conversationRouter.post('/', verifyToken, httpSendConversation);
conversationRouter.get('/', verifyToken, httpGetConversations);
conversationRouter.get('/single/:id', verifyToken, httpGetConversation);
conversationRouter.put('/:id', verifyToken, httpUpdateConversations);
module.exports = { conversationRouter };
