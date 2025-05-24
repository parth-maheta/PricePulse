import { useState } from "react";
import axios from "axios";
import "./InputForm.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function InputForm({ onProductAdded }) {
  const [url, setUrl] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!url) return setError("Please enter a product URL");
    setLoading(true);

    try {
      // 1. Track product
      const res = await axios.post(`${BASE_URL}/api/products`, { url });
      onProductAdded(res.data);
      const product = res.data;

      // 2. If alert is set, schedule alert
      if (targetPrice && email) {
        await axios.post(`${BASE_URL}/api/alerts/create`, {
          productUrl: product.url,
          targetPrice,
          userEmail: email,
          productName: product.title,
          productImage: product.image,
        });
      }

      setUrl("");
      setTargetPrice("");
      setEmail("");
    } catch (err) {
      setError("Failed to add product or alert.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="url"
          placeholder="Enter Amazon product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Target Price (optional)"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Track"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}
