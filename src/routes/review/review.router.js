const express = require('express');

const verifyToken = require('../../middleware/jwt');
const {
  httpSendReview,
  httpGetReview,
  httpDeleteReview,
} = require('./review.controller');
const reviewRouter = express.Router();

reviewRouter.post('/', verifyToken, httpSendReview);
reviewRouter.get('/:id', httpGetReview);
reviewRouter.delete('/:id', httpDeleteReview);

module.exports = { reviewRouter };
