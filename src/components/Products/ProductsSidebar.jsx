import React from "react";

import "./ProductsSidebar.css";
import Navlinks from "../Navbar/Navlinks";
import useData from "../../hooks/useData";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category");

  return (
    <aside className="products_sidebar">
      <h4>Product Categories</h4>

      <div className="category_links">
        {error && <em className="error_message">{error}</em>}
        {categories &&
          categories.map((category) => (
            <Navlinks
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
