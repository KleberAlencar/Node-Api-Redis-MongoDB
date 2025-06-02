"use strict";
const { body, validationResult } = require("express-validator");

exports.validateProduct = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 50 characters long"),

  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Slug must be between 3 and 30 characters long"),

  body("description")
  .notEmpty()
  .withMessage("Description is required")
  .isLength({ min: 10, max: 500 })
  .withMessage("Description must be between 10 and 500 characters long"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price is required"),

  body("tags")
    .isArray()
    .withMessage("Tags must be an array")
    .notEmpty()
    .withMessage("Tags are required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
