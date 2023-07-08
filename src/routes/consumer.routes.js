const express = require("express");
const { ConsumerController } = require("../controllers/consumer.controller");

const consumerRouter = express.Router();

consumerRouter.post("/register", ConsumerController.registerConsumer);
consumerRouter.post("/login", ConsumerController.loginConsumer);

module.exports.ConsumerRouter = consumerRouter;
