const Order = require('../../model/order.model');
const Gig = require('../../model/gig.model');

const createError = require('../../utils/createError');
const httpSendOrder = async function (req, res, next) {
  const gig = await Gig.findById(req.params.id);

  const newOrder = new Order({
    gigId: gig._id,
    image: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    isCompleted: true,
    payment_intent: 'temporary',
  });

  await newOrder.save();
  res.status(200).send(`sucessful`);
};

const httpGetOrders = async function (req, res, next) {
  const orders = await Order.find({
    ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
    isCompleted: true,
  });
  res.status(200).json(orders);
};

module.exports = { httpSendOrder, httpGetOrders };
