const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  title: { type: String, required: true },
  studio: { type: ObjectId, required: true },
  released: {type:Number, required: true},
  cast: [
    role: {type: String, required: false},
    actor: {type: ObjectID, required: true}
  ]
});

module.exports = mongoose.model("Film", filmSchema);
