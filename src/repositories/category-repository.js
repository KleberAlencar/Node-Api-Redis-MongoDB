"use strict";

const mongoose = require("mongoose");
const Category = mongoose.model("Category");

exports.get = async () => {
  const res = await Category.find({ active: true }, "name description featured createdAt");
  return res;
};

exports.create = async (data) => {
  const category = new Category(data);
  await category.save();
};

exports.update = async (id, data) => {
  await Category.findByIdAndUpdate(id, { $set: data });
}

exports.delete = async (id) => {
  await Category.findByIdAndRemove(id);
};