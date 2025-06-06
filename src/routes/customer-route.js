"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/customer-controller");
const authService = require("../services/auth-service");
const { validateCustomer } = require("../validators/customer-validator");

router.post("/", validateCustomer, controller.post);
router.post("/authenticate", controller.authenticate);
router.post("/refresh-token", authService.authorize, controller.refreshToken);

module.exports = router;
