import React, { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "./ProductCard";
import Loader from "./Loader";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  useEffect(() => {
    setLoading(true);

    API.get(`/products?search=${search}&category=${category}&page=${page}&limit=${limit}`)
      .then(res => setProducts(res.data.products), setLoading(false))
      .catch(console.error, setLoading(false));
      setLoading(false);
  }, [search, category, page]);

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
          <option value="Books">Books</option>
          <option value="Fashion">Fashion</option>
          <option value="Fitness">Fitness</option>
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
      <div className="products-grid">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      </>)}
    </div>
  );
}

export default ProductList;
