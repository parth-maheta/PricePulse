const express = require("express");
const router = express.Router();
const clerkAuth = require("../middleware/clerkAuth"); // Use Clerk middleware
const Product = require("../models/Product");
const {
  trackProduct,
  getAllProducts,
} = require("../controllers/ProductController");

// Get all products for logged in user
router.get("/", clerkAuth, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.auth.userId }); // use Clerk userId
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Track new product (pass through Clerk auth)
router.post("/", clerkAuth, trackProduct);

module.exports = router;
