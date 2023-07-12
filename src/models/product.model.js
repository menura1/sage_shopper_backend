const mongoose = require("mongoose");
const { ProductCategories } = require("../constants/commonConstants");
const { UserDemographics } = require("./consumer.model");

// Define the Product schema
const productSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // enum: ProductCategories,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: UserDemographics,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
