import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import EnquiryForm from "./EnquiryForm";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img
        src={product.image_url || "/placeholder.png"}
        alt={product.name}
        className="details-img"
      />

      <h2>{product.name}</h2>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <p>{product.long_desc}</p>

      <button className="btn enquiry-btn" onClick={() => setOpenForm(true)}>
        Enquire Now
      </button>

      {openForm && (
        <EnquiryForm productId={product.id} close={() => setOpenForm(false)} />
      )}
    </div>
  );
}

export default ProductDetails;
