const express = require("express");
const { ProductController } = require("../controllers/product.controller");
const { Auth } = require("../middleware/auth");

const productRouter = new express.Router();

productRouter.post("/createProduct", Auth, ProductController.createProduct);
productRouter.get("/getAllProducts", ProductController.getAllProducts);
productRouter.get(
  "/getProductsByDemographics",
  Auth,
  ProductController.getProductsByDemographics
);
productRouter.post("/deleteProduct", Auth, ProductController.deleteProduct);

module.exports.ProductRouter = productRouter;
