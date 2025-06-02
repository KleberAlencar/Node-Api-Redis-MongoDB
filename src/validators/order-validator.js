"use strict";

const { body, validationResult } = require("express-validator");

exports.validateOrder = [
  body("customerId").isMongoId().withMessage("Invalid customer ID format"),
  body("items")
    .isArray()
    .withMessage("Items must be an array")
    .notEmpty()
    .withMessage("Items cannot be empty"),
  body("total").isNumeric().withMessage("Total must be a numeric value"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
