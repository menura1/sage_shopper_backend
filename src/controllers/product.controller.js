const { ProductService } = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    if (newProduct) {
      return res.json(newProduct);
    } else {
      return res.status(500).json("Error");
    }
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

const getAllProducts = async (_, res) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.json(products);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

/// Get matching products for matching demographics
const getProductsByDemographics = async (req, res) => {
  try {
    const products = await ProductService.getProductsByDemographics(
      req.query.consumerId,
      req.query.coordinates
    );
    if (products) {
      return res.json(products);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports.ProductController = {
  createProduct,
  getAllProducts,
  getProductsByDemographics,
};
