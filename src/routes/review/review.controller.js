const Review = require('../../model/review.model');
const Gig = require('../../model/gig.model');
const User = require('../../model/user.model');
const createError = require('../../utils/createError');

const httpSendReview = async function (req, res, next) {
  // if (req.isSeller)
  //   return next(createError(403, `Sorry!, you can't review your account`));
  const gig = await Gig.findOne({ userId: req.userId });
  const user = await User.findById(req.userId);
  console.log(user);

  if (gig.userId === user._id)
    return next(createError(403, `Sorry, you can't review your account`));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    ...req.body,
  });

  const review = await Review.findOne({
    gigId: req.body.gigId,
    userId: req.userId,
  });

  if (review)
    return next(createError(404, `You have already created a review`));

  const savedReview = await newReview.save();

  await Gig.findByIdAndUpdate(req.body.gigId, {
    $inc: { totalStars: req.body.star, starNumber: 1 },
  });
  res.status(201).json(savedReview);
};
const httpGetReview = async function (req, res, next) {
  const reviews = await Review.find({ gigId: req.params.id });
  res.status(200).json(reviews);
};
const httpDeleteReview = async function (req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { httpSendReview, httpGetReview, httpDeleteReview };
