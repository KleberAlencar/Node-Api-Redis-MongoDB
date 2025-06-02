"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");
const authService = require("../services/auth-service");
const { validateProduct } = require("../validators/product-validator");

router.get("/", controller.get);
router.get("/:slug", controller.getBySlug);
router.get("/admin/:id", controller.getById);
router.get("/tags/:tag", controller.getByTag);
router.post("/", authService.isAdmin, validateProduct, controller.post);
router.put("/:id", authService.isAdmin, controller.put);
router.delete("/", authService.isAdmin, controller.delete);

module.exports = router;
