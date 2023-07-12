const mongoose = require("mongoose");

/// Consumer demographics schema
const UserDemographics = new mongoose.Schema(
  {
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    avgMonthlyIncome: {
      type: Number,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    interests: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  }
);

// Define the Consumer schema
const consumerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  demographics: {
    type: UserDemographics,
    required: true,
  },
});

const Consumer = mongoose.model("Consumer", consumerSchema);

module.exports = { Consumer, UserDemographics };
