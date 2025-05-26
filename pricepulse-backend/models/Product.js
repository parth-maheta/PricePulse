const mongoose = require("mongoose");

const priceHistorySchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // added userId
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String },
  currentPrice: { type: Number, required: true },
  priceHistory: [priceHistorySchema],
  lastChecked: { type: Date },
});

module.exports = mongoose.model("Product", productSchema);
