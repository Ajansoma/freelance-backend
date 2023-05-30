const User = require('../../model/user.model');
const createError = require('../../utils/createError');

const getUserContoller = async function (req, res, next) {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};

const deleteUserController = async function (req, res, next) {
  const id = req.params.id;

  const user = await User.findById(id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, 'you can only delete your account'));
  }
  await User.findByIdAndDelete(id);
  res.status(200).send('deleted');
};

module.exports = {
  getUserContoller,
  deleteUserController,
};
