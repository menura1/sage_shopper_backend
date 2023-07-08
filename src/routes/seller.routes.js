const express = require("express");
const { SellerController } = require("../controllers/seller.controller");

const sellerRouter = express.Router();

sellerRouter.post("/register", SellerController.registerSeller);
sellerRouter.post("/login", SellerController.loginSeller);

module.exports.SellerRouter = sellerRouter;
