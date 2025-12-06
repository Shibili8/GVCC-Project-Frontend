import React, { useEffect, useState } from "react";
import API from "../api";

function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    API.get("/admin/enquiries")
      .then((res) => {
        setEnquiries(res.data.enquiries);
        setFiltered(res.data.enquiries);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load enquiries. Token may be wrong.");
      });
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      enquiries.filter((e) =>
        e.name.toLowerCase().includes(s) ||
        e.email.toLowerCase().includes(s) ||
        (e.product_name || "").toLowerCase().includes(s)
      )
    );
  }, [search, enquiries]);

  return (
    <div className="admin-container">
      <h2>Admin Enquiries Panel</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by name, email or product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.product_name || "General Enquiry"}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone || "-"}</td>
                <td>{e.message}</td>
                <td>{new Date(e.created_at).toLocaleString()}</td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="empty">
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
