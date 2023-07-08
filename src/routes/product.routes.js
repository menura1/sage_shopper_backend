const express = require("express");
const { ProductController } = require("../controllers/product.controller");

const productRouter = new express.Router();

productRouter.post("/createProduct", ProductController.createProduct);
productRouter.get("/getAllProducts", ProductController.getAllProducts);
productRouter.get(
  "/getProductsByDemographics",
  ProductController.getProductsByDemographics
);

module.exports.ProductRouter = productRouter;
