"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/category-controller");
const authService = require("../services/auth-service");
const { validateCategory } = require("../validators/category-validator");

router.get("/", controller.get);
router.post("/", authService.isAdmin, validateCategory, controller.post);
router.put("/:id", authService.isAdmin, controller.put);
router.delete("/", authService.isAdmin, controller.delete);

module.exports = router;
