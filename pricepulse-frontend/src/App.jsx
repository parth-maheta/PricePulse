import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import PriceHistoryChart from "./components/PriceHistoryChart";
import axios from "axios";
import "./App.css";
import "./components/Product.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    const fetchAlerts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/alerts`);
        setAlerts(res.data);
      } catch (err) {
        console.error("Error fetching alerts", err);
      }
    };

    fetchProducts();
    fetchAlerts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📉 PricePulse - Amazon Price Tracker</h1>
      <InputForm onProductAdded={handleProductAdded} />

      {products.length === 0 ? (
        <p className="no-products">No products being tracked yet.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p>Current Price: ₹{product.currentPrice}</p>
            <small>
              Last Checked: {new Date(product.lastChecked).toLocaleString()}
            </small>

            <h3>Price History</h3>
            <PriceHistoryChart data={product.priceHistory} />
          </div>
        ))
      )}

      <h2>Price Drop Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts scheduled.</p>
      ) : (
        alerts.map((alert) => (
          <div key={alert._id} className="alert-card">
            <h3>{alert.productName}</h3>
            <img src={alert.productImage} alt={alert.productName} width={100} />
            <p>
              Target Price: ₹{alert.targetPrice} | Your Email: {alert.userEmail}
            </p>
            <p>Alert Status: {alert.alertSent ? "Sent ✅" : "Scheduled ⏳"}</p>
            <a
              href={alert.productUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Product
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
