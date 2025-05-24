const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  productUrl: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  userEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  alertSent: { type: Boolean, default: false },
  productName: { type: String },
  productImage: { type: String },
});

module.exports = mongoose.model("Alert", alertSchema);
