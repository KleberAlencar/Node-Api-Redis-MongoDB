"use strict";
const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
  return jwt.sign(data, global.SALT_KEY, {
    expiresIn: "1d",
  });
};

exports.decodeToken = async (token) => {
  return jwt.verify(token, global.SALT_KEY, (error, decoded) => {
    if (error) {
      return error;
    } else {
      return decoded;
    }
  });
};

exports.authorize = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"] ||
    req.headers["x-access-token"];
  if (!token) {
    res.status(401).send({ message: "Token not provided" });
  } else {
    try {
      const decoded = this.decodeToken(token);
      if (decoded instanceof Error) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    } catch (error) {
      res.status(500).send({ message: "Failed to authenticate token" });
    }
  }
};

exports.isAdmin = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Invalid Token",
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: "Invalid Token",
        });
      } else {
        if (decoded.roles.includes("admin")) {
          next();
        } else {
          res.status(403).json({
            message: "Access denied. Admins only.",
          });
        }
      }
    });
  }
};
