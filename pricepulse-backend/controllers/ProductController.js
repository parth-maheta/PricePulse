const Product = require("../models/Product");
const { scrapeAmazonProduct } = require("../scraper/amazonScraper");

exports.trackProduct = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Product URL is required" });
  }

  try {
    console.log("User ID:", req.userId);
    console.log("Tracking product URL:", url);

    const scrapedData = await scrapeAmazonProduct(url);

    if (!scrapedData) {
      console.error("Scraping returned no data for URL:", url);
      return res.status(500).json({ error: "Failed to scrape product data" });
    }

    // Check required scraped data fields
    const { price, title, image } = scrapedData;
    if (price == null || !title) {
      console.error("Scraped data missing required fields:", scrapedData);
      return res.status(500).json({ error: "Scraped data incomplete" });
    }

    // Find product for this user and URL
    let product = await Product.findOne({ url, userId: req.userId });

    if (product) {
      product.currentPrice = price;
      product.title = title;
      product.image = image || product.image; // update image if scraped
      product.lastChecked = new Date();
      product.priceHistory.push({
        price: price,
        checkedAt: new Date(),
      });
    } else {
      product = new Product({
        userId: req.userId,
        url,
        title,
        currentPrice: price,
        image,
        priceHistory: [{ price, checkedAt: new Date() }],
        lastChecked: new Date(),
      });
    }

    await product.save();

    res.json(product);
  } catch (error) {
    console.error("Error in trackProduct controller:", error);
    res.status(500).json({ error: "Failed to track product" });
  }
};
