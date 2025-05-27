import React, { useState } from "react";
import InputForm from "../components/InputForm";
import PriceHistoryChart from "../components/PriceHistoryChart";
import axios from "axios";
import { useAuth, SignIn } from "@clerk/clerk-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function TrackNewProductPage() {
  const { isSignedIn, getToken } = useAuth();
  const [trackedProduct, setTrackedProduct] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(false);

  const handleProductTracked = async (product) => {
    setTrackedProduct(product);
    setLoadingAlerts(true);

    try {
      const token = await getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { productUrl: product.url },
      };
      const res = await axios.get(`${BASE_URL}/api/alerts`, config);
      setAlerts(res.data.alerts || []);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      setAlerts([]);
    } finally {
      setLoadingAlerts(false);
    }
  };

  if (!isSignedIn) {
    return <SignIn path="/signin" routing="path" />;
  }

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

            {/* ✅ Add alerts section here */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4">
                Alerts for this Product
              </h2>

              {loadingAlerts ? (
                <p>Loading alerts...</p>
              ) : alerts.length === 0 ? (
                <p className="text-gray-500">
                  No alerts scheduled for this product.
                </p>
              ) : (
                <ul className="space-y-2">
                  {alerts.map((alert) => (
                    <li
                      key={alert._id}
                      className="bg-indigo-50 p-3 rounded-md shadow-sm"
                    >
                      <p>
                        Target Price:{" "}
                        <span className="font-semibold">
                          ₹{alert.targetPrice}
                        </span>
                      </p>
                      <p>
                        Status: {alert.alertSent ? "Sent ✅" : "Scheduled ⏳"}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
