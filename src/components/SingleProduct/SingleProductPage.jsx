import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import useData from "./../../hooks/useData";

import "./SingleProductPage.css";
import config from "../../config.json";
import QuantityInput from "./QuantityInput";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  const { data: product, error } = useData(`/products/${productId}`);
  const { description, images, price, reviews, stock, title } = product || {};

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {images &&
                images.map((image, index) => (
                  <img
                    src={`${config.backendURL}/products/${image}`}
                    alt={title}
                    key={index}
                    className={selectedImage === index ? "selected_image" : ""}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
            </div>
            {images && images.length > 0 && (
              <img
                src={`${config.backendURL}/products/${images[selectedImage]}`}
                alt={title}
                className="single_product_display"
              />
            )}
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{title}</h1>
            <p className="single_product_description">{description}</p>
            <p className="single_product_price">£{price}</p>
            {user && (
              <>
                {" "}
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={stock}
                  />
                </div>
                <h2 className="quantity_title">Quantity: {stock} available</h2>
                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
