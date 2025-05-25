import React, { useState } from "react";
import InputForm from "../components/InputForm";
import PriceHistoryChart from "../components/PriceHistoryChart";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TrackNewProductPage() {
  const [trackedProduct, setTrackedProduct] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(false);

  const handleProductTracked = async (product) => {
    setTrackedProduct(product);
    setLoadingAlerts(true);

    try {
      const res = await axios.get(`${BASE_URL}/api/alerts`, {
        params: { productUrl: product.url },
      });
      setAlerts(res.data.alerts || []);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      setAlerts([]);
    } finally {
      setLoadingAlerts(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-violet-100 text-gray-900 p-4 sm:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-6 sm:mb-8 pt-12 sm:pt-16">
          Track a New Product
        </h1>

        <InputForm onProductTracked={handleProductTracked} />

        {trackedProduct && (
          <div className="mt-10 sm:mt-12 bg-white shadow-lg rounded-2xl p-4 sm:p-6 space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">
              Now Tracking
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <img
                  src={trackedProduct.image}
                  alt={trackedProduct.title}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-contain rounded border border-gray-200"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-2">
                  {trackedProduct.title}
                </h3>
                <p className="text-indigo-600 font-bold text-base sm:text-lg mb-1">
                  Current Price: ₹{trackedProduct.currentPrice}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Last Checked:{" "}
                  {new Date(trackedProduct.lastChecked).toLocaleString()}
                </p>

                <div className="overflow-x-auto">
                  <PriceHistoryChart data={trackedProduct.priceHistory} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
