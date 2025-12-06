import React, { useState } from "react";

function AdminLogin({ onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!token.trim()) {
      setError("Token is required");
      return;
    }
    if (token ==="admin123"){
        localStorage.setItem("adminToken", token)
        onLogin();

    }
    else{
        alert("Unauthorized admin access")
    }
}   
  

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Enter admin token"
        value={token}
        className="login-input"
        onChange={(e) => {
          setToken(e.target.value);
          setError("");
        }}
      />

      {error && <p className="error">{error}</p>}

      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default AdminLogin;
