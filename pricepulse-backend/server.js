require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { startScheduler } = require("./scheduler");
const productRoutes = require("./routes/productRoutes");
const alertRoutes = require("./routes/alertRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PricePulse backend is running");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/alerts", alertRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    startScheduler();
  })
  .catch((err) => console.log("DB Error:", err));
