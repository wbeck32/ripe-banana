/* eslint no-console: "off" */
const mongoose = require("mongoose");
// We want to use native V8 Promise, not the built-in one.
// bit of legacy deal, just something we need to do
mongoose.Promise = Promise;

// this env name "MONGODB_URI" is used by heroku when adding an mLab instance
const dbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mongoosePeople";

mongoose.connect(dbUri, {
  useMongoClient: true
});

// events: connected, error, disconnected, SIGINT
mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection open to " + dbUri);
});

mongoose.connection.on("error", function() {
  console.log("error!");
});

mongoose.connection.on("disconnected", function() {
  console.log("disconnected!");
});

// If the Node process ends, close the Mongoose connection
// TODO: figure out process values
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
