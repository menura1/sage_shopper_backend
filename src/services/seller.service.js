const Seller = require("../models/seller.model");
const bcrypt = require("bcrypt");

/// Register new seller
const registerSeller = async (email, name, password) => {
  //check existing seller
  const seller = await Seller.findOne({
    email,
  });
  if (seller) {
    throw Error("Email already in use");
  }
  /// hash the  password
  const hash = bcrypt.hashSync(password, 10);
  // Create a new seller
  const newSeller = new Seller({
    name,
    email,
    password: hash,
  });
  const savedSeller = await newSeller.save();
  console.log("New seller created:", savedSeller);
  return savedSeller;
};

/// Login seller
const loginSeller = async (email, password) => {
  //find existing seller
  const seller = await Seller.findOne({
    email,
  });
  if (!seller) {
    throw Error("Email not found");
  }

  // check password
  const match = bcrypt.compareSync(password, seller.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return seller;
};

module.exports.SellerService = {
  registerSeller,
  loginSeller,
};
