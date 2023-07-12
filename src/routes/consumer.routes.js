const express = require("express");
const { ConsumerController } = require("../controllers/consumer.controller");
const { Auth } = require("../middleware/auth");

const consumerRouter = express.Router();

consumerRouter.post("/register", ConsumerController.registerConsumer);
consumerRouter.post("/login", ConsumerController.loginConsumer);
consumerRouter.post(
  "/updateAccount",
  Auth,
  ConsumerController.updateConsumerAccount
);
consumerRouter.get("/geoInfo", ConsumerController.getGeoInfo);

module.exports.ConsumerRouter = consumerRouter;
