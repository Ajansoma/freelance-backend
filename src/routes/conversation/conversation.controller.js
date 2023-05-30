const Conversation = require('../../model/conversation.model');
const createError = require('../../utils/createError');

const httpSendConversation = async function (req, res, next) {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readByBuyer: req.isSeller,
    readBySeller: !req.isSeller,
  });

  const savedConversations = await newConversation.save();
  res.status(201).json(savedConversations);
};

const httpGetConversations = async function (req, res, next) {
  const conversations = await Conversation.find(
    req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
  ).sort({ updatedAt: -1 });
  res.status(201).json(conversations);
};

const httpGetConversation = async function (req, res, next) {
  const conversation = await Conversation.findOne({ id: req.params.id });
  if (!conversation) return next(createError(404, 'Not Found'));
  res.status(200).json(conversation);
};

const httpUpdateConversations = async function (req, res, next) {
  const updatedConversation = await Conversation.findOneAndUpdate(
    { id: req.params.id },
    {
      set: {
        ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
      },
    },
    { new: true }
  );
  res.status(200).send(updatedConversation);
};

module.exports = {
  httpSendConversation,
  httpGetConversation,
  httpGetConversations,
  httpUpdateConversations,
};
