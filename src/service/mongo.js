const mongo = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

const mongoConnect = async function () {
  try {
    await mongo.connect(MONGO_URL);
    console.log('connected to mongodb');
  } catch (err) {
    console.log(err);
  }
};

const mongoDisconnect = async function () {
  await mongo.disconnect(MONGO_URL);
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
