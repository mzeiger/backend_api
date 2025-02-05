const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});
const Banner = mongoose.model("Banner", bannerSchema); // Mongoose changes "Banner" to "banners" automatically

module.exports = Banner;
