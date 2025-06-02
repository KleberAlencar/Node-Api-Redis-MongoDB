"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/order-controller");
const authService = require("../services/auth-service");
const { validateOrder } = require("../validators/order-validator");

router.get("/", authService.authorize, controller.get);
router.post("/", authService.authorize, validateOrder, controller.post);

module.exports = router;
