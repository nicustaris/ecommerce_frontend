import React, { useEffect, useState, useContext } from "react";

import config from "../../config.json";
import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "./../../services/orderServices";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons } from "@paypal/react-paypal-js";

import removeIcon from "../../assets/delete.svg";
import { toast } from "react-toastify";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  const user = useContext(UserContext);
  const { cart, setCart, removeFromCart, updateCart } = useContext(CartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart, subTotal]);

  const checkout = () => {
    setIsPaymentActive(false);

    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Your order has been successfully processed!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
  };

  const initialOptions = {
    clientId:
      "AQyzVdUTrhyflxmVLwa3EdFe8DzqjCUk-jL_4Bq3tJnR-G-uPlEzErUmBC725xw8m1Mw3bwUstMGIk5N",
    currency: "GBP",
    intent: "capture",
  };

  const onApprove = () => {
    // Call checkout function when the payment is approved
    // To clear basked and record payment details
    checkout();
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <>
      <section className="align_center cart_page">
        <div className="align_center user_info">
          <img
            src={`${config.backendURL}/profile/${user?.profilePic}`}
            alt="user profile"
          />
          <div>
            <p className="user_name">{user?.name}</p>
            <p className="user_email">{user?.email}</p>
          </div>
        </div>
        <Table headings={["Items", "Price", "Quantity", "Total", "Remove"]}>
          <tbody>
            {cart.map(({ product, quantity }) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>£{product.price}</td>
                <td className="align_center table_quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    stock={product.stock}
                    setQuantity={updateCart}
                    productId={product._id}
                    cartPage={true}
                  />
                </td>
                <td>{quantity * product.price}</td>
                <td onClick={() => removeFromCart(product._id)}>
                  <img src={removeIcon} className="removeIcon" />
                </td>
              </tr>
            ))}
          </tbody>
          {cart.length <= 0 && (
            <p style={{ padding: "20px", fontSize: "14px", fontWeight: "400" }}>
              Your cart is currently empty
            </p>
          )}
        </Table>
        <table className="cart_bill">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>£{subTotal}</td>
            </tr>
            <tr>
              <td>Shipping Charge</td>
              <td>£{cart.length > 0 ? "5" : "0"}</td>
            </tr>
            <tr className="cart_bill_final">
              <td>Total</td>
              <td>£{cart.length > 0 ? subTotal + 5 : subTotal}</td>
            </tr>
          </tbody>
        </table>
        <button
          className="search_button checkout_button"
          onClick={() => setIsPaymentActive(true)}
          disabled={cart.length > 0 ? false : true}
        >
          Proceed with the payment
        </button>
        {isPaymentActive && (
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              forceReRender={[subTotal]}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "pay",
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "Ecommerce Web Application",
                      amount: {
                        currency_code: "GBP",
                        value: parseFloat(subTotal).toFixed(2),
                      },
                    },
                  ],
                  application_context: {
                    shipping_preference: "NO_SHIPPING",
                  },
                });
              }}
              onApprove={() => onApprove()}
              onError={onError}
            />
          </PayPalScriptProvider>
        )}
      </section>
    </>
  );
};

export default CartPage;
