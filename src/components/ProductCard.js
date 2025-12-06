import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img
        src={product.image_url || "/placeholder.png"}
        alt={product.name}
        className="product-img"
      />
      <div>
      <h3>{product.name}</h3>
      <p>{product.short_desc}</p>
      <p className="price">₹{product.price}</p>
      </div>
      <Link to={`/products/${product.id}`}>
        <button className="btn">View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;
