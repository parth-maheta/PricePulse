const { chromium } = require("playwright");

async function scrapeAmazonProduct(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });

    const productData = await page.evaluate(() => {
      const title = document.querySelector("#productTitle")?.innerText.trim();
      const image = document.querySelector(
        "#landingImage, #imgTagWrapperId img"
      )?.src;
      const priceElement = document.querySelector(".a-price .a-offscreen");
      const priceText = priceElement ? priceElement.innerText : null;

      const price = priceText
        ? parseFloat(priceText.replace(/[₹,]/g, ""))
        : null;

      return { title, image, price };
    });

    await browser.close();

    if (!productData.title || !productData.price) {
      throw new Error("Failed to scrape product data");
    }

    return productData;
  } catch (err) {
    await browser.close();
    console.error("Scraping Error:", err.message);
    return null;
  }
}

module.exports = { scrapeAmazonProduct };
