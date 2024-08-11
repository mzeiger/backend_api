const express = require("express");
const ProductReview = require("../models/product_review");
const Product = require("../models/products");
const productReviewRouter = express.Router();

productReviewRouter.post("/api/product-review", async (req, res) => {
  try {
    const { buyerId, email, fullName, productId, rating, review } = req.body;
    const productReview = new ProductReview({
      buyerId,
      email,
      fullName,
      productId,
      rating,
      review,
    });
    await productReview.save();
    res.status(201).send(productReview);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productReviewRouter.get("/api/reviews", async (req, res) => {
try {
  const reviews = await ProductReview.find();
  res.status(200).json(reviews);
} catch (e) {
  res.status(500).json({error: e.message});
}
});

module.exports = productReviewRouter;
