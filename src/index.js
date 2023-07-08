const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { AppRouter } = require("./routes/routes");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const { Consumer } = require("./models/consumer.model");

const app = express();

/// adding middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/", AppRouter);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Running server on port ${process.env.SERVER_PORT || 5001}`);
});

mongoose
  .connect(
    "mongodb+srv://user1:VEc3s51NP06eocq7@cluster0.2qbtenx.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "target_audience",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connection successful");
    // Index creation
    const createIndexes = async () => {
      try {
        // Create the index on the targetAudience.location field in the products collection
        await Product.createIndexes({ "targetAudience.location": "2dsphere" });
        await Consumer.createIndexes({ "demographics.location": "2dsphere" });

        console.log("Indexes created successfully");
      } catch (error) {
        console.error("Error creating indexes:", error);
      }
    };

    // Call the createIndexes function
    createIndexes();
  })
  .catch((e) => console.log("DB connection failed , ", e.message));
