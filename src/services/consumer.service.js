const bcrypt = require("bcrypt");
const { Consumer } = require("../models/consumer.model");

/// Register new consumer
const registerConsumer = async (data) => {
  //check existing seller
  const consumer = await Consumer.findOne({
    email: data.email,
  });
  if (consumer) {
    throw Error("Email already in use");
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
  console.log("New consumer created:", savedConsumer);
  return savedConsumer;
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

  return consumer;
};

module.exports.ConsumerService = {
  registerConsumer,
  loginConsumer,
};
