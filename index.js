const express = require("express");
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/sub_category');
const productRouter = require('./routes/product');
const productReviewRouter = require('./routes/product_review');
const cors = require('cors');

const PORT = 3000;

const app = express();
const DB = "mongodb+srv://markzeiger:poPPy$213@cluster0.lt6mihz.mongodb.net/";

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);

mongoose.connect(DB).then(() => {
  console.log("Connected to mongodb");
});

app.listen(PORT, "0.0.0.0", function () {
  console.log(`Server running on port ${PORT}`);
});
