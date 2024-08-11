const express = require("express");
const Banner = require("../models/banner");
const bannerRouter = express.Router();

bannerRouter.post("/api/banners", async (req, res) => {
  try {
    const { image } = req.body; // destructuring
    const banner = new Banner({ image }); // lowercase "b"
    await banner.save();
    res.status(201).send(banner);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

bannerRouter.get("/api/banners", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).send(banners);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = bannerRouter;
