const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");

router.post("/create", async (req, res) => {
  const { productUrl, targetPrice, userEmail, productName, productImage } =
    req.body;

  if (!productUrl || !targetPrice || !userEmail) {
    return res.status(400).json({
      error: "All fields (productUrl, targetPrice, userEmail) are required.",
    });
  }

  try {
    const alert = new Alert({
      productUrl,
      targetPrice,
      userEmail,
      alertSent: false,
      productName,
      productImage,
    });

    await alert.save();
    res.json({ message: "Alert scheduled successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to schedule alert." });
  }
});

router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

module.exports = router;
