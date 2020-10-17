const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ALTITUDE = 222; // metres above sea level (Łódź, Poland)
const ABS_PRESSURE_FACTOR = 11.3;

const calculateAbsolutePressure = (pressure) =>
  Math.round((pressure + (ALTITUDE * ABS_PRESSURE_FACTOR) / 100) * 100) / 100;

const DataSchema = new Schema(
  {
    temp1: Number,
    hum1: Number,
    temp2: Number,
    hum2: Number,
    pressure: Number,
    absolutePressure: {
      type: Number,
      default: function () {
        return calculateAbsolutePressure(this.pressure);
      },
    },
  },
  { timestamps: true, collection: "measurements" }
);

module.exports = mongoose.model("Measurements", DataSchema);
