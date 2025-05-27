const express = require("express");
const router = express.Router();
const clerkAuth = require("../middleware/clerkAuth"); // <-- use Clerk middleware here
const Alert = require("../models/Alert");

router.post("/create", clerkAuth, async (req, res) => {
  const { productUrl, targetPrice, userEmail, productName, productImage } =
    req.body;

  if (!productUrl || !targetPrice || !userEmail) {
    return res.status(400).json({
      error: "All fields (productUrl, targetPrice, userEmail) are required.",
    });
  }

  try {
    const alert = new Alert({
      userId: req.auth.userId, // use Clerk userId
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

router.get("/", clerkAuth, async (req, res) => {
  try {
    const filter = { userId: req.auth.userId }; // use Clerk userId
    if (req.query.productUrl) filter.productUrl = req.query.productUrl;

    const alerts = await Alert.find(filter);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

module.exports = router;
