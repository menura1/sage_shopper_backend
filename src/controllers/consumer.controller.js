const { ConsumerService } = require("../services/consumer.service");

/// Register consumer
const registerConsumer = async (req, res) => {
  const data = req.body;
  //TODO validate req
  try {
    const newConsumer = await ConsumerService.registerConsumer(data);
    if (newConsumer) {
      return res.json(newConsumer);
    }
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

/// Login consumer
const loginConsumer = async (req, res) => {
  const data = req.body;
  //TODO validate req
  if (!data.email || !data.password) {
    return res.json("Invalid request");
  }
  try {
    const consumer = await ConsumerService.loginConsumer(
      data.email,
      data.password
    );
    if (consumer) {
      return res.json(consumer);
    }
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

/// Update consumer account
const updateConsumerAccount = async (req, res) => {
  try {
    const user = await ConsumerService.updateConsumerAccount(req.body);
    if (!user) {
      throw Error("User update failed!");
    }
    return res.json(user);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

module.exports.ConsumerController = {
  registerConsumer,
  loginConsumer,
  updateConsumerAccount,
};
