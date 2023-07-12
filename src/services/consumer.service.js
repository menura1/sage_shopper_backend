const bcrypt = require("bcrypt");
const { Consumer } = require("../models/consumer.model");
const jwt = require("jsonwebtoken");
const { JwtSecret } = require("../constants/commonConstants");
const axios = require("axios");

/// Register new consumer
const registerConsumer = async (data) => {
  //check existing seller
  const consumer = await Consumer.findOne({
    email: data.email,
  });
  if (consumer) {
    throw Error("Email already in use");
  }

  if (data.password == "" || !data.password) {
    throw Error("Password cannot be empty!");
  }

  if (data.demographics.interests.length == 0) {
    throw Error("Please select at least one interest!");
  }

  /// hash the  password
  const hash = bcrypt.hashSync(data.password, 10);

  // Create a new consumer
  const newConsumer = new Consumer({
    ...data,
    password: hash,
  });

  // Save the consumer to the database
  const savedConsumer = await newConsumer.save();

  const accessToken = jwt.sign({ _id: savedConsumer._id }, JwtSecret, {
    expiresIn: "100d",
  });
  return { ...savedConsumer.toJSON(), accessToken };
};

/// Login consumer
const loginConsumer = async (email, password) => {
  //find existing consumer
  const consumer = await Consumer.findOne({
    email,
  });
  if (!consumer) {
    throw Error("Email not found");
  }

  // check password
  const match = bcrypt.compareSync(password, consumer.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  const accessToken = jwt.sign({ _id: consumer._id }, JwtSecret, {
    expiresIn: "100d",
  });
  return { ...consumer.toJSON(), accessToken };
};

/// Update consumer account
const updateConsumerAccount = async (data) => {
  if (data.demographics.interests.length == 0) {
    throw Error("Interests cannot be empty!");
  }
  const user = await Consumer.findById(data._id);
  if (!user) {
    throw Error("User not found!");
  }

  Object.assign(user, {
    ...data,
    demographics: {
      ...data.demographics,
      location: user.demographics.location,
    },
  });

  return await user.save();
};

/// get geo info of the req ip address
const getGeoInfo = async (req) => {
  const r = await axios.request({
    method: "get",
    url: `http://ip-api.com/json/${
      req.headers["x-forwarded-for"] || req.socket.remoteAddress
    }?fields=lat,lon,country,city`,
  });
  return r.data;
};

module.exports.ConsumerService = {
  registerConsumer,
  loginConsumer,
  updateConsumerAccount,
  getGeoInfo,
};
