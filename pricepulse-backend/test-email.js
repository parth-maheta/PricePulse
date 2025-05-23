require("dotenv").config();
const { sendPriceDropEmail } = require("./emailService");

sendPriceDropEmail("parthmaheta1221@gmail.com", {
  productName: "Test Product",
  productImage: "https://via.placeholder.com/150",
  currentPrice: 500,
  targetPrice: 1000,
  productUrl: "https://amazon.in/test-product",
});
