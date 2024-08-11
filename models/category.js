const mongoose = require("mongoose");  // no changes

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
