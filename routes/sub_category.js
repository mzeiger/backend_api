const express = require("express");
const SubCategory = require("../models/sub_category");
const subCategoryRouter = express.Router();

subCategoryRouter.post("/api/subcategories", async (req, res) => {
  try {
    const { categoryId, categoryName, image, subCategoryName } = req.body; // destructuring
    const subcategory = new SubCategory({
      // note small "b" so as not to conflict with "subCategory = require('../models..."")
      categoryId,
      categoryName,
      image,
      subCategoryName,
    });
    await subcategory.save();
    res.status(201).send(subcategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

subCategoryRouter.get("/api/subcategories", async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ subCategories });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

subCategoryRouter.get(
  "/api/category/:categoryName/subcategories",
  async (req, res) => {
    try {
      // extract category name from the request URL
      const { categoryName } = req.params;
      const subcategories = await SubCategory.find({
        categoryName: categoryName,
      });
      if (!subcategories || subcategories.length == 0) {
        res.status(404).send(`There are no sub categories for ${categoryName}.`);
      } else {
        res.status(200).json( subcategories );
      }
    } catch (e) {
      res.status(500).json({ error: e, message });
    }
  }
);

module.exports = subCategoryRouter;
