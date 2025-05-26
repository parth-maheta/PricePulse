const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const {
  trackProduct,
  getAllProducts,
} = require("../controllers/ProductController");

// Get all products for logged in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Track new product (example, adjust controller to accept userId)
router.post("/", authMiddleware, trackProduct);

module.exports = router;
