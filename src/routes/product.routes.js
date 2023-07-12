const express = require("express");
const { ProductController } = require("../controllers/product.controller");
const { Auth } = require("../middleware/auth");
const axios = require("axios");

const productRouter = new express.Router();

productRouter.post("/createProduct", Auth, ProductController.createProduct);
productRouter.get("/getAllProducts", ProductController.getAllProducts);
productRouter.get(
  "/getProductsByDemographics",
  Auth,
  ProductController.getProductsByDemographics
);
productRouter.post("/deleteProduct", Auth, ProductController.deleteProduct);

/// test code
productRouter.get("/ip", async (req, res) => {
  console.log(req.socket.remoteAddress);
  const r = await axios.request({
    method: "get",
    url: "http://ip-api.com/json?fields=lat,lon,country,city",
  });
  console.log(r.data);
  return res.json(r.data);
});

module.exports.ProductRouter = productRouter;
