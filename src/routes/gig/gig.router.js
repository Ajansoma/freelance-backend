const express = require('express');
const verifyToken = require('../../middleware/jwt');

const gigRouter = express.Router();

const {
  postGigContoller,
  deleteGigContoller,
  getGigContoller,
  getGigsContoller,
} = require('./gig.controller');

gigRouter.post('/', verifyToken, postGigContoller);
gigRouter.delete('/:id', verifyToken, deleteGigContoller);
gigRouter.get('/single/:id', getGigContoller);
gigRouter.get('/', getGigsContoller);

module.exports = { gigRouter };
