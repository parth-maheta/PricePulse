const express = require("express");
const router = express.Router();

const {
  trackProduct,
  getAllProducts,
} = require("../controllers/ProductController");

router.post("/", trackProduct);
router.get("/", getAllProducts);

module.exports = router;
