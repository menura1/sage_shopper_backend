const { SellerService } = require("../services/seller.service");

/// Register seller
const registerSeller = async (req, res) => {
  const data = req.body;
  //TODO validate req
  try {
    const newSeller = await SellerService.registerSeller(
      data.email,
      data.name,
      data.password
    );
    if (newSeller) {
      return res.json(newSeller);
    }
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

/// Login seller
const loginSeller = async (req, res) => {
  const data = req.body;
  //TODO validate req
  try {
    const seller = await SellerService.loginSeller(data.email, data.password);
    if (seller) {
      return res.json(seller);
    }
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

module.exports.SellerController = {
  registerSeller,
  loginSeller,
};
