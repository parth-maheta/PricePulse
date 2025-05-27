const { chromium } = require("playwright");

async function scrapeAmazonProduct(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { timeout: 60000, waitUntil: "networkidle" });

    // ❗ Detect captcha or access denied page
    const bodyText = await page.content();
    if (
      bodyText.includes("Enter the characters you see below") ||
      bodyText.includes("To discuss automated access")
    ) {
      throw new Error("Blocked by Amazon captcha or bot protection");
    }

    // 📌 Extra wait for slow rendering elements
    await page.waitForTimeout(3000);

    // Wait for product title
    await page.waitForSelector("#productTitle", {
      timeout: 15000,
      state: "visible",
    });

    const productData = await page.evaluate(() => {
      const title = document.querySelector("#productTitle")?.innerText.trim();

      const image =
        document.querySelector("#landingImage")?.src ||
        document.querySelector("#imgTagWrapperId img")?.src;

      const priceElement =
        document.querySelector(".a-price .a-offscreen") ||
        document.querySelector("#priceblock_ourprice") ||
        document.querySelector("#priceblock_dealprice") ||
        document.querySelector("#priceblock_saleprice");

      const priceText = priceElement ? priceElement.textContent.trim() : null;

      const price = priceText
        ? parseFloat(priceText.replace(/[₹,]/g, ""))
        : null;

      return { title, image, price };
    });

    if (!productData.title || productData.price == null) {
      throw new Error("Missing title or price");
    }

    return productData;
  } catch (err) {
    console.error("❌ Scraping Error:", err.message);
    return null;
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeAmazonProduct };
