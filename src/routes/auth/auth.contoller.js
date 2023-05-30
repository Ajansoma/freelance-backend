const User = require('../../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../../utils/createError');

const postRegisterController = async function (req, res, next) {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    return res.status(200).send('sent sucessfully');
  } catch (err) {
    next(createError(404, `User Already exist`));
  }
};

const postLoginController = async function (req, res, next) {
  const user = await User.findOne({ username: req.body.username });

  if (!user) next(createError(404, 'Email/Password Invalid!'));

  const isCorrect = bcrypt.compareSync(req.body.password, user.password);
  if (!isCorrect) return next(createError(404, 'wrong password or username'));

  const token = jwt.sign(
    {
      id: user._id,
      isSeller: user.isSeller,
    },
    process.env.JWT_KEY
  );
  const { password, ...otherInfo } = user._doc;
  res
    .cookie('accessToken', token, { httpOnly: true })
    .status(200)
    .send(otherInfo);
};

const postLogOutController = async function (req, res) {
  return res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('user has been logged out');
};

module.exports = {
  postRegisterController,
  postLoginController,
  postLogOutController,
};
