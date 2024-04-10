import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const tokeninlocal = localStorage.getItem("tokens");
  const [token, settoken] = useState(tokeninlocal);

  const userIsLoggedin = !!token;
  console.log("items in cart provider", userIsLoggedin);

  const additemhandler = (token) => {
    settoken(token);
    console.log("items in cart provider", token);
    localStorage.setItem("tokens", token);
  };

  const logouthandler = () => {
    settoken(null);
    localStorage.removeItem("tokens");
  };

  const cartcontext = {
    token: token,
    isLoggedIn: userIsLoggedin,
    addItem: additemhandler,
    logout: logouthandler,
  };
  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
