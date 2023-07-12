const geolib = require("geolib");
const { Consumer } = require("../models/consumer.model");
const Product = require("../models/product.model");

/// Create new product
const createProduct = async (data) => {
  const newProduct = new Product(data);
  if (newProduct) {
    const savedProduct = await newProduct.save();
    return savedProduct;
  }
};

/// Get all products
const getAllProducts = async () => {
  const products = await Product.find();
  if (products) {
    return products;
  } else {
    throw Error("Couldn't get products.");
  }
};

/// Get most matching products for a consumer
const getProductsByDemographics = async (userId, coordinates = []) => {
  try {
    // Find the user with the given userId
    const user = await Consumer.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Get the user's demographics
    const userDemographics = user.demographics;

    // Find all products
    const products = await Product.find({}).lean();

    // Calculate the matching score for each product
    const productsWithScores = products.map((product) => {
      const targetAudience = product.targetAudience;
      const score = calculateMatchingScore(
        userDemographics,
        targetAudience,
        coordinates
      );

      return {
        ...product,
        score,
      };
    });

    // Sort the products based on the matching scores (highest to lowest)
    const sortedProducts = productsWithScores.sort((a, b) => b.score - a.score);

    return sortedProducts;
  } catch (error) {
    throw new Error("Failed to retrieve products: " + error.message);
  }
};

// Helper function to calculate matching score between user demographics and target audience demographics
function calculateMatchingScore(
  userDemographics,
  targetDemographics,
  coordinates
) {
  let score = 0;

  // Calculate matching score based on gender
  const userGender = userDemographics.gender;
  const targetGender = targetDemographics.gender;

  // Increase the score if the user and target have the same gender or if the target is gender-neutral
  if (userGender === targetGender || targetGender === "neutral") {
    score += 20;
  }

  // Calculate matching score based on age
  const userAge = userDemographics.age;
  const targetAge = targetDemographics.age;

  // Increase the score based on the proximity of age
  const ageDiff = Math.abs(userAge - targetAge);
  // Normalize the value adding to the score
  const normalizedValue = 1 - Math.log10(ageDiff + 1) / Math.log10(150);
  score += normalizedValue * 20;

  // Calculate matching score based on common interests
  const userInterests = userDemographics.interests;
  const targetInterests = targetDemographics.interests;

  // Increase the score based on the number of common interests
  const commonInterests = userInterests.filter((interest) =>
    targetInterests.includes(interest)
  );
  // Add the normalized value to the score
  score += (commonInterests.length / targetInterests.length) * 20;

  // Calculate matching score based on location
  const userLocation =
    coordinates.length == 0
      ? {
          latitude: userDemographics.location.coordinates[1],
          longitude: userDemographics.location.coordinates[0],
        }
      : {
          latitude: coordinates[1],
          longitude: coordinates[0],
        };

  const targetLocation = {
    latitude: targetDemographics.location.coordinates[1],
    longitude: targetDemographics.location.coordinates[0],
  };

  // Calculate the distance between the user and the target location using geolib
  const distance = geolib.getDistance(userLocation, targetLocation);
  const distanceScore = Math.max(20 - (distance / 1000000000) * 20, 0);

  // Increase the score based on proximity (closer distance gets higher score)
  score += distanceScore;

  // Increase the score based on the proximity of average monthly income
  const userIncome = userDemographics.avgMonthlyIncome;
  const targetIncome = targetDemographics.avgMonthlyIncome;

  const diff = Math.abs(userIncome - targetIncome);
  // Normalize the value adding to the score
  const normalizedDiff = 1 - Math.log10(diff + 1) / Math.log10(500000000);
  const incomeScore = normalizedDiff * 20;
  score += incomeScore;

  return score;
}

/// delete product
const deleteProduct = async (productId) => {
  console.log(productId);
  const product = await Product.findById(productId);
  return await product.deleteOne();
};

module.exports.ProductService = {
  createProduct,
  getAllProducts,
  getProductsByDemographics,
  deleteProduct,
};
