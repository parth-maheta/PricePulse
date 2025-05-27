exports.trackProduct = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Product URL is required" });
  }

  try {
    // Get userId from Clerk auth info attached to request by middleware
    const userId = req.auth?.userId || req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("User ID:", userId);
    console.log("Tracking product URL:", url);

    const scrapedData = await scrapeAmazonProduct(url);

    if (!scrapedData) {
      console.error("Scraping returned no data for URL:", url);
      return res.status(500).json({ error: "Failed to scrape product data" });
    }

    const { price, title, image } = scrapedData;
    if (price == null || !title) {
      console.error("Scraped data missing required fields:", scrapedData);
      return res.status(500).json({ error: "Scraped data incomplete" });
    }

    let product = await Product.findOne({ url, userId });

    if (product) {
      product.currentPrice = price;
      product.title = title;
      product.image = image || product.image;
      product.lastChecked = new Date();
      product.priceHistory.push({
        price,
        checkedAt: new Date(),
      });
    } else {
      product = new Product({
        userId,
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
