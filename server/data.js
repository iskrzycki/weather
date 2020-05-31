const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    temperature: Number,
    pressure: Number,
    humidity: Number,
  },
  { timestamps: true, collection: "measurements" }
);

module.exports = mongoose.model("Measurements", DataSchema);
