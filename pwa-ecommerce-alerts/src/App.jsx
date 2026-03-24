import { useState, useEffect } from "react";

function App() {
  const [permission, setPermission] = useState(Notification.permission);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const products = [
    { id: 1, name: "Wireless Headphones", price: 49.99 },
    { id: 2, name: "Smart Watch", price: 79.99 },
    { id: 3, name: "Bluetooth Speaker", price: 29.99 },
    { id: 4, name: "Gaming Mouse", price: 19.99 }
  ];

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const requestNotificationPermission = async () => {
    const status = await Notification.requestPermission();
    setPermission(status);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛍️ PWA E-Commerce Alerts</h1>

      {deferredPrompt && (
        <button style={styles.installBtn} onClick={handleInstallClick}>
          📲 Install App
        </button>
      )}

      <div style={styles.card}>
        <p>
          Notification Permission: <b>{permission}</b>
        </p>
        {permission !== "granted" && (
          <button style={styles.notifyBtn} onClick={requestNotificationPermission}>
            🔔 Enable Notifications
          </button>
        )}
      </div>

      <h2 style={styles.section}>✨ Features</h2>
      <ul style={styles.features}>
        <li>Push Notifications for deals</li>
        <li>Installable PWA App</li>
        <li>Offline Support</li>
        <li>Fast React UI</li>
      </ul>

      <h2 style={styles.section}>🛒 Featured Products</h2>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.product}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button style={styles.buyBtn}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    padding: 20,
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    minHeight: "100vh",
    color: "#333"
  },
  title: {
    textAlign: "center",
    color: "white",
    animation: "fadeIn 1s ease-in"
  },
  card: {
    background: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  section: {
    color: "white"
  },
  features: {
    background: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: 15
  },
  product: {
    background: "white",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    transition: "0.3s",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  buyBtn: {
    background: "#4facfe",
    border: "none",
    padding: "8px 15px",
    color: "white",
    borderRadius: 5,
    cursor: "pointer"
  },
  installBtn: {
    background: "#ff9800",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: 5,
    marginBottom: 10,
    cursor: "pointer"
  },
  notifyBtn: {
    background: "#4caf50",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
};

export default App;