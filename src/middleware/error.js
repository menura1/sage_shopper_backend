const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

module.exports = { errorHandler };
