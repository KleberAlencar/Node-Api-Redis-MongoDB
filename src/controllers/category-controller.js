"use strict";

const repository = require("../repositories/category-repository");
const redisClient = require("../../config/redis");

// Cache-Aside Pattern with TTL (Time to Live) for featured categories

exports.get = async (req, res, next) => {
  try {
    const cacheKey = "featured_categories";
    const cachedCategories = await redisClient.get(cacheKey);

    if (cachedCategories) {
      console.log("Returning cached categories from Redis");
      return res.status(200).send(JSON.parse(cachedCategories));
    }

    console.log("Fetching categories from database");
    let data = await repository.get();
    await redisClient.setEx(cacheKey, 10, JSON.stringify(data));
    res.status(200).send(data);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).send({
      message: "Failed to retrieve categories",
      error: error,
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      name: req.body.name,
      description: req.body.description,
      featured: req.body.featured || false,
    });
    res.status(201).send({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create category",
      error: error,
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      featured: req.body.featured || false,
    });
    res.status(200).send({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update category",
      error: error,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete category",
      error: error,
    });
  }
};
