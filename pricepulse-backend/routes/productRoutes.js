const express = require("express");
const router = express.Router();

const {
  trackProduct,
  getAllProducts, // <-- add this
} = require("../controllers/ProductController");

router.post("/", trackProduct);
router.get("/", getAllProducts); // <-- add this route

module.exports = router;
