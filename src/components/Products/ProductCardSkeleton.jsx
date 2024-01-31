import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <Skeleton
      className="product_card"
      style={{ width: "275px", backgroundColor: "#fff", animation: "none" }}
    />
  );
};

export default ProductCardSkeleton;
