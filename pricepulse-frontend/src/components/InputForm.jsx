import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function InputForm({ onProductAdded }) {
  const [url, setUrl] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simple URL validation for Amazon URLs
  const isValidAmazonUrl = (inputUrl) => {
    try {
      const parsed = new URL(inputUrl);
      return (
        parsed.hostname.includes("amazon.") &&
        (parsed.pathname.includes("/dp/") || parsed.pathname.includes("/gp/"))
      );
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url) {
      setError("Please enter a product URL.");
      return;
    }

    if (!isValidAmazonUrl(url)) {
      setError("Please enter a valid Amazon product URL.");
      return;
    }

    if (targetPrice && (isNaN(targetPrice) || Number(targetPrice) <= 0)) {
      setError("Target price must be a positive number.");
      return;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/products`, { url });
      onProductAdded(res.data);
      const product = res.data;

      if (targetPrice && email) {
        await axios.post(`${BASE_URL}/api/alerts/create`, {
          productUrl: product.url,
          targetPrice: Number(targetPrice),
          userEmail: email,
          productName: product.title,
          productImage: product.image,
        });
      }

      setUrl("");
      setTargetPrice("");
      setEmail("");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add product or alert. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg border border-purple-200 max-w-4xl mx-auto space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0">
        <input
          type="url"
          placeholder="Enter Amazon product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value.trim())}
          className="flex-1 px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="Amazon product URL"
          required
        />
        <input
          type="number"
          min="1"
          step="any"
          placeholder="Target Price"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value.trim())}
          className="w-48 px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="Target price"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          className="w-64 px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="User email"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              Adding...
            </>
          ) : (
            "Track"
          )}
        </button>
      </div>
      {error && <p className="text-red-600 text-center text-sm">{error}</p>}
    </form>
  );
}
