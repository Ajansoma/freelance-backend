const Gig = require('../../model/gig.model');
const createError = require('../../utils/createError');

const postGigContoller = async function (req, res, next) {
  if (!req.isSeller) {
    return next(createError(403, 'only sellers can create gigs'));
  }

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  const savedGig = await newGig.save();
  res.status(201).json(savedGig);
};

const deleteGigContoller = async function (req, res, next) {
  const gig = await Gig.findById(req.params.id);

  if (gig.userId !== req.userId)
    return next(createError(`You can only delete gigs from your account`));

  await Gig.findByIdAndDelete(req.params.id);
  res.status(201).send(`Gig has been sucessfully deleted`);
};

const getGigContoller = async function (req, res, next) {
  const gig = await Gig.findById(req.params.id);
  if (!gig) next(createError(404, `No Gig Found`));
  res.status(201).json(gig);
};

const getGigsContoller = async function (req, res, next) {
  const { query } = req;

  const filters = {
    ...(query.userId && { userId: query.userId }),
    ...(query.category && { category: query.category }),
    ...((query.min || query.max) && {
      price: {
        ...(query.min && { $gt: query.min }),
        ...(query.max && { $lt: query.max }),
      },
    }),
    ...(query.search && { title: { $regex: query.search, $options: 'i' } }),
  };

  const gigs = await Gig.find(filters);
  res.status(201).json(gigs);
};

module.exports = {
  postGigContoller,
  deleteGigContoller,
  getGigContoller,
  getGigsContoller,
};
