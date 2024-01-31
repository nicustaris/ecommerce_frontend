import React, { useContext } from "react";

import "./ProductCard.css";
import config from "../../config.json";
import basket from "../../assets/basket.png";

import { NavLink } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

import star from "../../assets/star-icon.svg";
import halfStar from "../../assets/star-half-yellow-icon.svg";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={i} src={star} alt={star} />);
    }

    if (hasHalfStar) {
      stars.push(<img key={stars.length} src={halfStar} alt="half star" />);
    }

    return stars;
  };

  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`${config.backendURL}/products/${product?.images[0]}`}
            alt="alt"
          ></img>
        </NavLink>
      </div>
      <div className="product_details">
        <p className="product_title">{product?.title}</p>
        <h3 className="product_price">£{product?.price}</h3>
        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              {renderStars(product?.reviews.rate)}
              {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>
          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="to basket" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
