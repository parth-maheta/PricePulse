const cron = require("node-cron");
const Product = require("./models/Product");
const Alert = require("./models/Alert");
const { scrapeAmazonProduct } = require("./scraper/amazonScraper");
const { sendPriceDropEmail } = require("./emailService");

function startScheduler() {
  cron.schedule("*/30 * * * *", async () => {
    console.log("⏰ Running scheduled price update job every 30 minutes");

    try {
      const products = await Product.find();

      for (const product of products) {
        try {
          const scrapedData = await scrapeAmazonProduct(product.url);
          if (!scrapedData) continue;

          if (scrapedData.price !== product.currentPrice) {
            product.currentPrice = scrapedData.price;
            product.priceHistory.push({ price: scrapedData.price });
            product.lastChecked = new Date();
            await product.save();
            console.log(` Updated price for: ${product.title}`);
          } else {
            console.log(`Price unchanged for: ${product.title}`);
          }

          const alerts = await Alert.find({
            productUrl: product.url,
            alertSent: false,
          });

          for (const alert of alerts) {
            if (product.currentPrice < alert.targetPrice) {
              const emailSent = await sendPriceDropEmail(alert.userEmail, {
                productName: product.title,
                productImage: product.image,
                currentPrice: product.currentPrice,
                targetPrice: alert.targetPrice,
                productUrl: product.url,
              });

              if (emailSent) {
                alert.alertSent = true;
                await alert.save();
                console.log(
                  ` Alert sent to ${alert.userEmail} for ${product.title}`
                );
              } else {
                console.warn(` Email failed for ${alert.userEmail}`);
              }
            }
          }
        } catch (error) {
          console.error(
            ` Error updating product ${product.url}:`,
            error.message
          );
        }
      }
    } catch (err) {
      console.error(" Error fetching products:", err.message);
    }

    console.log(" Scheduled job finished");
  });
}

module.exports = { startScheduler };
