const express = require("express");
const app = express();
const user = require("./routes/user");
const product = require("./routes/product");
const cart = require("./routes/cart");
const category = require("./routes/category");
const order = require("./routes/order");
const cors = require('cors');

//config
require("dotenv").config({
  path: "./.env",
});

app.use(express.json());
app.use(cors());

app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/cart", cart);
app.use("/api/category", category);
app.use("/api/order", order);

module.exports = app;
