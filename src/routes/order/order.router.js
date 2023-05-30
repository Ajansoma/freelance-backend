const express = require('express');
const verifyToken = require('../../middleware/jwt');

const orderRouter = express.Router();

const { httpSendOrder, httpGetOrders } = require('./order.controller');

orderRouter.post('/:id', verifyToken, httpSendOrder);
orderRouter.get('/', verifyToken, httpGetOrders);
// orderRouter.delete('/:id', httpDeleteOrder);

module.exports = { orderRouter };
