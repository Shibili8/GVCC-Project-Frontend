import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function Header({ setAdminLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isOnAdminPage = location.pathname.startsWith("/admin");

  const handleSwitch = () => {
    if (isOnAdminPage) {
      setAdminLoggedIn(false);
      navigate("/");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="header">
      <h1 className="title">Product Showcase & Enquiry</h1>

      <button className="admin-btn" onClick={handleSwitch}>
        {isOnAdminPage ? "Switch to Client" : "Switch to Admin"}
      </button>
    </div>
  );
}

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  return (
    <Router>
      <div className="container">

        <Header adminLoggedIn={adminLoggedIn} setAdminLoggedIn={setAdminLoggedIn} />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route
            path="/admin"
            element={
              adminLoggedIn ? (
                <AdminDashboard />
              ) : (
                <AdminLogin onLogin={() => setAdminLoggedIn(true)} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
