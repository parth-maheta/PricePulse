import { useEffect, useState, useCallback } from "react";
import InputForm from "./components/InputForm";
import PriceHistoryChart from "./components/PriceHistoryChart";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-indigo-300 transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-32 h-32 object-contain mx-auto sm:mx-0 rounded-md"
        />
        <div className="flex-1 mt-4 sm:mt-0">
          <h2 className="text-xl font-semibold text-indigo-700 mb-1">
            {product.title}
          </h2>
          <p className="text-indigo-600 font-bold text-lg mb-1">
            Current Price: ₹{product.currentPrice}
          </p>
          <p className="text-sm text-gray-500">
            Last Checked: {new Date(product.lastChecked).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2 text-indigo-700">
          Price History
        </h3>
        <PriceHistoryChart data={product.priceHistory} />
      </div>
    </div>
  );
}

function AlertCard({ alert }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-indigo-200 transition-shadow duration-200">
      <img
        src={alert.productImage}
        alt={alert.productName}
        className="w-20 h-20 object-contain rounded-md"
      />
      <div>
        <h3 className="text-lg font-semibold text-indigo-700">
          {alert.productName}
        </h3>
        <p className="text-gray-700 text-sm">
          Target Price: ₹{alert.targetPrice}
        </p>
        <p className="text-gray-700 text-sm">Email: {alert.userEmail}</p>
        <p className="text-sm">
          Status:{" "}
          <span
            className={
              alert.alertSent
                ? "text-green-600 font-semibold"
                : "text-orange-500 font-semibold"
            }
          >
            {alert.alertSent ? "Sent ✅" : "Scheduled ⏳"}
          </span>
        </p>
        <a
          href={alert.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline text-sm mt-1 inline-block"
        >
          View Product
        </a>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-10">
      <svg
        className="animate-spin h-10 w-10 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
        role="img"
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
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorAlerts, setErrorAlerts] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      setErrorProducts("Failed to fetch products");
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchAlerts = useCallback(async () => {
    setLoadingAlerts(true);
    setErrorAlerts(null);
    try {
      const res = await axios.get(`${BASE_URL}/api/alerts`);
      setAlerts(res.data);
    } catch (err) {
      setErrorAlerts("Failed to fetch alerts");
      console.error(err);
    } finally {
      setLoadingAlerts(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchAlerts();
  }, [fetchProducts, fetchAlerts]);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-violet-100 text-gray-900 p-4 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-700 mb-10 select-none">
          📉 PricePulse – Amazon Price Tracker
        </h1>

        <InputForm onProductAdded={handleProductAdded} />

        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700 border-b border-indigo-300 pb-2">
            Tracked Products
          </h2>

          {loadingProducts ? (
            <LoadingSpinner />
          ) : errorProducts ? (
            <p className="text-center text-red-600">{errorProducts}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No products being tracked yet.
            </p>
          ) : (
            <div className="space-y-10">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700 border-b border-indigo-300 pb-2">
            Price Drop Alerts
          </h2>

          {loadingAlerts ? (
            <LoadingSpinner />
          ) : errorAlerts ? (
            <p className="text-center text-red-600">{errorAlerts}</p>
          ) : alerts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No alerts scheduled.
            </p>
          ) : (
            <div className="space-y-6">
              {alerts.map((alert) => (
                <AlertCard key={alert._id} alert={alert} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
