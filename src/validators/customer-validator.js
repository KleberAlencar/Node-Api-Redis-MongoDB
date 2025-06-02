"use strict";

const { body, validationResult } = require("express-validator");

exports.validateCustomer = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 80 })
    .withMessage("Name must be between 3 and 80 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must be a valid mobile phone number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
