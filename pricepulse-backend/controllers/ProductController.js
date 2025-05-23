const Product = require("../models/Product");
const { scrapeAmazonProduct } = require("../scraper/amazonScraper");

exports.trackProduct = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Product URL is required" });

  try {
    const scrapedData = await scrapeAmazonProduct(url);
    if (!scrapedData) throw new Error("Failed to scrape product data");

    let product = await Product.findOne({ url });

    if (product) {
      product.currentPrice = scrapedData.price;
      product.title = scrapedData.title;
      product.lastChecked = new Date();
      product.priceHistory.push({
        price: scrapedData.price,
        checkedAt: new Date(),
      });
    } else {
      product = new Product({
        url,
        title: scrapedData.title,
        currentPrice: scrapedData.price,
        image: scrapedData.image,
        priceHistory: [{ price: scrapedData.price, checkedAt: new Date() }],
        lastChecked: new Date(),
      });
    }

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to track product" });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ lastChecked: -1 });
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
