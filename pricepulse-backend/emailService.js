const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid");

async function sendPriceDropEmail(
  to,
  { productName, productImage, currentPrice, targetPrice, productUrl }
) {
  try {
    let transporter = nodemailer.createTransport(
      sgTransport({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to,
      subject: `Price Drop Alert: ${productName}`,
      html: `
        <h2>Price Drop Alert!</h2>
        <p>The price of <strong>${productName}</strong> has dropped below your target price.</p>
        ${
          productImage
            ? `<img src="${productImage}" alt="${productName}" width="200"/>`
            : ""
        }
        <p><b>Current Price:</b> ₹${currentPrice}</p>
        <p><b>Your Target Price:</b> ₹${targetPrice}</p>
        <p><a href="${productUrl}">View Product</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to} for product ${productName}`);
    return true;
  } catch (error) {
    console.error(
      "❌ Failed to send email:",
      error?.response?.body || error.message
    );
    return false;
  }
}

module.exports = { sendPriceDropEmail };
