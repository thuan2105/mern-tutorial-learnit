const express = require("express");
const route = require("./routes");
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoseDB
db.connectDB();

// Router init
route(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, () => console.log(`Server started on port ${port}`));
