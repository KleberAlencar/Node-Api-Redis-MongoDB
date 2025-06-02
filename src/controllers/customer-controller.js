"use strict";

const repository = require("../repositories/customer-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: ["user"],
    });
    res.status(201).send({
      message: "Customer successfully registered",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to register customer",
      error: error,
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!customer) {
      res.status(404).send({
        message: "Invalid user or password",
      });
      return;
    }

    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "Failed to authenticate customer",
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res.status(404).send({
        message: "Customer not found",
      });
      return;
    }

    const tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "Failed to refresh token",
    });
  }
};
