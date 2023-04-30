const mongoose = require("mongoose");
require("dotenv").config();

let uri_mongodb = process.env.MONGODB_ENV;

exports.connectionMongoDb = async () => {
  await mongoose.connect(
    uri_mongodb,
    { useNewUrlParser: true },
    { useUnifieldTopology: true }
  );
};
