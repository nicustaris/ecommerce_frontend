import React from "react";

import Productcard from "../Products/ProductCard";
import "./Featuredproducts.css";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const Featuredproducts = () => {
  const { data, error, isLoading } = useData("/products/featured");
  return (
    <section className="featured_products">
      <h2>Featured Products</h2>

      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {data &&
          data.map((product) => (
            <Productcard key={product._id} product={product} />
          ))}
        {isLoading &&
          Array.from({ length: data?.length }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
      </div>
    </section>
  );
};

export default Featuredproducts;
