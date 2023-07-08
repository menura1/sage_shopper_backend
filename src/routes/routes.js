const express = require("express");
const { SellerRouter } = require("./seller.routes");
const { ConsumerRouter } = require("./consumer.routes");
const { ProductRouter } = require("./product.routes");

const router = express.Router();

router.use("/seller", SellerRouter);
router.use("/consumer", ConsumerRouter);
router.use("/product", ProductRouter);

module.exports.AppRouter = router;
