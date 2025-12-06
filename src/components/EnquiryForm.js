import React, { useState } from "react";
import API from "../api";

function EnquiryForm({ productId, close }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/enquiries", { ...form, product_id: productId })
      .then(() => {
        setStatus("Enquiry sent successfully!");
        setTimeout(() => close(), 1500);
      })
      .catch((err) => {
        setStatus("Failed to send enquiry.");
        console.error(err);
      });
  };

  return (
    <div className="modal">
      <div className="form-container">
        <h3>Submit Enquiry</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Phone (optional)"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            placeholder="Message"
            required
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <button className="btn" type="submit">Send</button>
        </form>

        {status && <p className="status">{status}</p>}

        <button className="close-btn" onClick={close}>X</button>
      </div>
    </div>
  );
}

export default EnquiryForm;
