const mongoose = require("mongoose");

const priceHistorySchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  currentPrice: { type: Number, required: true },
  priceHistory: [priceHistorySchema], // <-- Use it here, after definition
  lastChecked: { type: Date },
});

// Compound index to ensure uniqueness per user + URL
productSchema.index({ userId: 1, url: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);
