import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const [token, settoken] = useState(null);

  const userIsLoggedin = !!token;
  console.log("items in cart provider", userIsLoggedin);

  const additemhandler = (token) => {
    settoken(token);
    console.log("items in cart provider", token);
  };

  const logouthandler = () => {
    settoken(null);
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
