const axios = require("axios");
const cheerio = require("cheerio");

const SCRAPER_API_KEY = "17a2953c7c0f3b3f1688cd1f68c96dd9"; // 🔁 Replace with your key

async function scrapeAmazonProduct(url) {
  const scraperUrl = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(
    url
  )}&autoparse=false`;

  try {
    const { data: html } = await axios.get(scraperUrl);

    const $ = cheerio.load(html);

    const title = $("#productTitle").text().trim();

    const image =
      $("#landingImage").attr("src") || $("#imgTagWrapperId img").attr("src");

    const priceText =
      $(".a-price .a-offscreen").first().text().trim() ||
      $("#priceblock_ourprice").text().trim() ||
      $("#priceblock_dealprice").text().trim() ||
      $("#priceblock_saleprice").text().trim();

    const price = priceText ? parseFloat(priceText.replace(/[₹,]/g, "")) : null;

    if (!title || price == null) {
      throw new Error("Missing title or price");
    }

    return { title, image, price };
  } catch (err) {
    console.error("❌ Scraping Error:", err.message);
    return null;
  }
}

module.exports = { scrapeAmazonProduct };
