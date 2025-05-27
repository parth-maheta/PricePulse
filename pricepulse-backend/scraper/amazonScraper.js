const { chromium } = require("playwright");

// Resolve shortened Amazon URLs like https://amzn.in/...
async function resolveAmazonShortUrl(shortUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(shortUrl, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    const fullUrl = page.url(); // Resolves the redirect
    return fullUrl;
  } catch (err) {
    console.error("Error resolving short URL:", err.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function scrapeAmazonProduct(url) {
  // Resolve short URLs if needed
  if (url.includes("amzn.in")) {
    const resolved = await resolveAmazonShortUrl(url);
    if (!resolved) {
      throw new Error("Could not resolve shortened Amazon URL");
    }
    url = resolved;
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });

    await page.waitForSelector("#productTitle", { timeout: 10000 });
    await page.waitForSelector("#landingImage, #imgTagWrapperId img", {
      timeout: 10000,
    });

    const productData = await page.evaluate(() => {
      const title = document.querySelector("#productTitle")?.innerText.trim();
      const image = document.querySelector(
        "#landingImage, #imgTagWrapperId img"
      )?.src;

      const priceEls = [
        ...document.querySelectorAll(".a-price .a-offscreen"),
        document.querySelector("#priceblock_ourprice"),
        document.querySelector("#priceblock_dealprice"),
      ].filter(Boolean);

      let priceText = null;
      for (const el of priceEls) {
        if (el.innerText && el.innerText.trim() !== "") {
          priceText = el.innerText.trim();
          break;
        }
      }

      const price = priceText
        ? parseFloat(priceText.replace(/[₹,]/g, ""))
        : null;

      return { title, image, price };
    });

    if (!productData.title || productData.price === null) {
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
