const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { userRouter } = require('./routes/user/user.router');
const { authRouter } = require('./routes/auth/auth.router');
const { gigRouter } = require('./routes/gig/gig.router');
const { reviewRouter } = require('./routes/review/review.router');
const { orderRouter } = require('./routes/order/order.router');
const { messageRouter } = require('./routes/message/message.router');
const {
  conversationRouter,
} = require('./routes/conversation/conversation.router');
const createError = require('./utils/createError');
// const verifyToken = require('./middleware/jwt');

const app = express();

app.use(
  cors({
    origin: 'https://freelance-app.onrender.com',
    credentials: true,
  })
);
app.use(morgan('combined'));

app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join('../client/dist')));
//  app.use(express.static(path.join(`https://freelance-app.onrender.com`)));

app.use('/auth', authRouter);
// app.use(verifyToken);
app.use('/user', userRouter);
app.use('/gigss', gigRouter);
app.use('/reviews', reviewRouter);
app.use('/orders', orderRouter);
app.use('/messages', messageRouter);
app.use('/conversations', conversationRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  return res.status(errorStatus).send(errorMessage);
});

app.get('/*', (req, res) => {
  // const indexPath = path.resolve('../client/dist/index.html');
  res.sendFile(`https://freelance-app.onrender.com`);
});

module.exports = app;
