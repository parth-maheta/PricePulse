const { chromium } = require("playwright");
const fs = require("fs");

// Resolve shortened Amazon URLs like https://amzn.in/...
async function resolveAmazonShortUrl(shortUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(shortUrl, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    return page.url(); // Resolves the redirect
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
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });

    let title = null;
    let image = null;
    let price = null;

    try {
      await page.waitForSelector("#productTitle", {
        timeout: 10000,
        state: "visible",
      });
      title = await page.$eval("#productTitle", (el) => el.innerText.trim());
    } catch {
      console.warn("⚠️ Could not extract title");
    }

    try {
      await page.waitForSelector("#landingImage, #imgTagWrapperId img", {
        timeout: 10000,
        state: "attached",
      });
      image = await page.$eval(
        "#landingImage, #imgTagWrapperId img",
        (el) => el.src
      );
    } catch {
      console.warn("⚠️ Could not extract image");
    }

    try {
      const priceText = await page.evaluate(() => {
        const els = [
          ...document.querySelectorAll(".a-price .a-offscreen"),
          document.querySelector("#priceblock_ourprice"),
          document.querySelector("#priceblock_dealprice"),
        ].filter(Boolean);

        for (const el of els) {
          if (el.innerText && el.innerText.trim() !== "") {
            return el.innerText.trim();
          }
        }
        return null;
      });

      price = priceText ? parseFloat(priceText.replace(/[₹,]/g, "")) : null;
    } catch {
      console.warn("⚠️ Could not extract price");
    }

    if (!title || price === null) {
      throw new Error(
        "Failed to extract product data. Missing title or price."
      );
    }

    return { title, image, price };
  } catch (err) {
    console.error("❌ Scraping Error:", err.message);
    await page.screenshot({ path: "error_screenshot.png", fullPage: true });
    const html = await page.content();
    fs.writeFileSync("error_page.html", html);
    return null;
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeAmazonProduct };
