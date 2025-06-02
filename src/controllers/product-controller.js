"use strict";

const repository = require("../repositories/product-repository");

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve products",
      error: error,
    });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    let data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve product by slug",
      error: error,
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    let data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve product by ID",
      error: error,
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    let data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve products by tag",
      error: error,
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.create(req.body);
    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create product",
      error: error,
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update product",
      error: error,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete product",
      error: error,
    });
  }
};
