"use strict";

const { body, validationResult } = require("express-validator");

exports.validateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 80 })
    .withMessage("Name must be between 3 and 80 characters long"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Description must be between 3 and 200 characters long"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be a boolean value"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
