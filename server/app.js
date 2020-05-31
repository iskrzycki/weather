const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const Measurements = require("./data");
const config = require("./config");

const API_PORT = 7256;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = `mongodb://${config.dbName}:${config.dbPass}@${config.host}:${config.dbPort}/${config.dbName}`;
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/getData", (req, res) => {
  Measurements.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getLast", (req, res) => {
  Measurements.findOne({}, {}, { sort: { createdAt: -1 } }, (err, data) => {
    res.json(data);
  });
});

router.post("/create", (req, res) => {
  Measurements.create(req.body, (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.json(req.body);
    }
  });
});

// append /api to all router paths
app.use("/api", router);

app.use(express.static(path.join(__dirname, "public")));

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
