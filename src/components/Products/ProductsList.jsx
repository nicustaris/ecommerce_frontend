import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
// import Pagination from "../Common/Pagination";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const [search, setSearch] = useSearchParams();
  const category = search.get("category");

  const searchQuery = search.get("search");

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        perPage: 10,
        page,
      },
    },
    [searchQuery, category, page]
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // const handlePageChange = (page) => {
  //   const currentSearch = Object.fromEntries([...search]);

  //   setSearch({ ...currentSearch, page: parseInt(currentSearch.page) + 1 });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        data &&
        page < data.totalPages &&
        !isLoading
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);
  //UsDAix0jYYWiHjHm
  //nicolaestaris
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [data, sortBy]);

  console.log(data);

  return (
    <section className="products_list_section">
      <header className="products_list_header">
        <p className="products_showing_results">
          Showing {data?.products.length} of {data?.totalProducts} result
        </p>
        <select
          name="sort"
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data?.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
      {/* <Pagination
        totalProducts={data?.totalProducts}
        productsPerPage="8"
        onClick={handlePageChange}
        currentPage={page}
      /> */}
    </section>
  );
};

export default ProductsList;
