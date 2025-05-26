const Product = require("../models/Product");
const { scrapeAmazonProduct } = require("../scraper/amazonScraper");

exports.trackProduct = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Product URL is required" });

  try {
    const scrapedData = await scrapeAmazonProduct(url);
    if (!scrapedData) throw new Error("Failed to scrape product data");

    // Find product belonging to this user by url
    let product = await Product.findOne({ url, userId: req.userId });

    if (product) {
      product.currentPrice = scrapedData.price;
      product.title = scrapedData.title;
      product.lastChecked = new Date();
      product.priceHistory.push({
        price: scrapedData.price,
        checkedAt: new Date(), // keep checkedAt or rename to date if you want
      });
    } else {
      product = new Product({
        userId: req.userId, // assign logged-in user ID here
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
    // Fetch only products belonging to logged-in user
    const products = await Product.find({ userId: req.userId }).sort({
      lastChecked: -1,
    });
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
