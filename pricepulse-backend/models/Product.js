const mongoose = require("mongoose");

const priceHistorySchema = new mongoose.Schema({
  price: { type: Number, required: true },
  checkedAt: { type: Date, required: true, default: Date.now },
});

const productSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String },
  currentPrice: { type: Number, required: true },
  priceHistory: [priceHistorySchema],
  lastChecked: { type: Date },
});

module.exports = mongoose.model("Product", productSchema);
