import React from "react";

import "./QuantityInput.css";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  productId,
  cartPage,
}) => {
  return (
    <>
      <button
        className="quantity_input_button"
        disabled={quantity <= 1}
        onClick={() =>
          cartPage
            ? setQuantity(productId, "decrease")
            : setQuantity(quantity - 1)
        }
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        disabled={quantity >= stock}
        onClick={() =>
          cartPage
            ? setQuantity(productId, "increase")
            : setQuantity(quantity + 1)
        }
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
