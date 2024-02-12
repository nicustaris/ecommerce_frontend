import React, { useContext, useEffect, useState } from "react";

import "./Navbar.css";
import Navlinks from "./Navlinks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionsAPI } from "../../services/productServices";

import logo from "./ecommerce.png";
import searchIcon from "../../assets/search-icon.svg";
import cartIcon from "../../assets/cart.svg";

const Navbar = () => {
  const [search, setsearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);

  const { cart } = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const delaySuggestinos = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaySuggestinos);
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedItem((current) =>
        current === suggestions.length - 1 ? 0 : current + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedItem((current) =>
        current === 0 ? suggestions.length - 1 : current - 1
      );
    } else if (e.key === "Enter" && selectedItem > -1) {
      const suggestion = suggestions[selectedItem];
      navigate(`/products?search=${suggestion.title}`);
      setsearch("");
      setSuggestions([]);
    }
  };

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">
          <img src={logo} />
        </h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
              setSelectedItem(0);
            }}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button type="submit" className="search_buttonIcon">
            <img src={searchIcon} className="searchIcon" />
          </button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setsearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div onClick={handleToggleMenu} className="burger_menu">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {showMenu && (
        <div className="modal">
          <div className="modal_content">
            <button className="modal_close" onClick={handleToggleMenu}>
              X
            </button>
            <Navlinks title="HOME" link="/" />
            <Navlinks title="PRODUCTS" link="/products" />
            {!user && (
              <>
                <Navlinks title="LOGIN" link="/login" />
                <Navlinks title="SIGNUP" link="/signup" />
              </>
            )}
            {user && (
              <>
                <Navlinks title="MY ORDERS" link="/myorders" />
                <Navlinks title="LOGOUT" link="/logout" />
                <NavLink to="/cart" className="align_center">
                  <div className="align_center cart_counts">
                    <img src={cartIcon} />
                    <p className="cart_counts_number">{cart.length}</p>
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
      <div
        className={`align_center navbar_links ${showMenu ? "show_menu" : ""}`}
      >
        <Navlinks title="HOME" link="/" />
        <Navlinks title="PRODUCTS" link="/products" />
        {!user && (
          <>
            <Navlinks title="LOGIN" link="/login" />
            <Navlinks title="SIGNUP" link="/signup" />
          </>
        )}
        {user && (
          <>
            <Navlinks title="MY ORDERS" link="/myorders" />
            <Navlinks title="LOGOUT" link="/logout" />
            <NavLink to="/cart" className="align_center">
              <div className="align_center cart_counts">
                <img src={cartIcon} />
                <p className="cart_counts_number">{cart.length}</p>
              </div>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
