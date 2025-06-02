"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const redisClient = require("../config/redis");

const app = express();

mongoose.connect(config.connectionString);

// Loading the models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");
const Category = require("./models/category");

// Importing the routes
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");
const customerRoute = require("./routes/customer-route");
const orderRoute = require("./routes/order-route");
const categoryRoute = require("./routes/category-route");

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// Configuration
 app.set("redisClient", redisClient);

// Enable CORS 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);
app.use("/categories", categoryRoute);

module.exports = app;
