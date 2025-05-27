import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function InputForm({ onProductTracked }) {
  const { getToken } = useAuth();
  const [url, setUrl] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

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
      // Get the Clerk token asynchronously
      const token = await getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(`${BASE_URL}/api/products`, { url }, config);
      const product = res.data;

      if (onProductTracked) {
        onProductTracked(product);
      }

      if (targetPrice && email) {
        await axios.post(
          `${BASE_URL}/api/alerts/create`,
          {
            productUrl: product.url,
            targetPrice: Number(targetPrice),
            userEmail: email,
            productName: product.title,
            productImage: product.image,
          },
          config
        );
      }

      toast.success("Product tracking added successfully!");
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

  useEffect(() => {
    if (error) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-6 rounded-xl shadow-lg border border-purple-200 max-w-4xl mx-auto space-y-5 ${
          shake ? "shake" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="url"
            placeholder="Enter Amazon product URL"
            value={url}
            onChange={(e) => setUrl(e.target.value.trim())}
            className="w-full px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
            className="w-full px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            aria-label="Target price"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className="w-full px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            aria-label="User email"
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out ${
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

        {error && (
          <p className="text-red-600 text-center text-sm" role="alert">
            {error}
          </p>
        )}
      </form>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
}
