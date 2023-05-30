const Message = require('../../model/message.model');
const Conversation = require('../../model/conversation.model');

const httpSendMessage = async function (req, res, next) {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    description: req.body.description,
  });

  const savedMessage = await newMessage.save();

  try {
    await Conversation.findByIdAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.description,
        },
      },
      { new: true }
    );
  } catch (e) {
    console.log('err:', e);
  }
  res.status(200).json(savedMessage);
};

const httpGetMessages = async function (req, res, next) {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  httpSendMessage,
  httpGetMessages,
};
