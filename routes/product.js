const express = require("express");
const Product = require("../models/products");
const productRouter = express.Router();

productRouter.post("/api/add-product", async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images,
      popular,
      recommend,
    } = req.body;
    const product = new Product({
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images,
      popular,
      recommend,
    });
    await product.save();
    return res.status(201).send(product); // "return" is optional
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get the popular products

productRouter.get("/api/popular-products", async (req, res) => {
  try {
    const products = await Product.find({ popular: true });
    if (!products || products.length == 0) {
      res.status(404).json({ msg: "No popular products found" });
    } else {
      res.status(200).json(products);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/recommended-products", async (req, res) => {
    try {
      const products = await Product.find({ recommend: true });
      if (!products || products.length == 0) {
        res.status(404).json({ msg: "No rocommended products found" });
      } else {
        res.status(200).json(products);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

module.exports = productRouter;
