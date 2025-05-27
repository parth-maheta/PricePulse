const { chromium } = require("playwright");

async function scrapeAmazonProduct(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });

    // Wait for product title and price selectors to appear
    await page.waitForSelector("#productTitle", { timeout: 10000 });
    await page.waitForSelector(
      ".a-price .a-offscreen, #priceblock_ourprice, #priceblock_dealprice",
      { timeout: 10000 }
    );

    const productData = await page.evaluate(() => {
      const title = document.querySelector("#productTitle")?.innerText.trim();
      const image = document.querySelector(
        "#landingImage, #imgTagWrapperId img"
      )?.src;
      const priceElement =
        document.querySelector(".a-price .a-offscreen") ||
        document.querySelector("#priceblock_ourprice") ||
        document.querySelector("#priceblock_dealprice");
      const priceText = priceElement ? priceElement.innerText : null;

      const price = priceText
        ? parseFloat(priceText.replace(/[₹,]/g, ""))
        : null;

      return { title, image, price };
    });

    if (!productData.title || !productData.price) {
      throw new Error("Failed to scrape product data");
    }

    return productData;
  } catch (err) {
    console.error("Scraping Error:", err.message);
    return null;
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeAmazonProduct };
