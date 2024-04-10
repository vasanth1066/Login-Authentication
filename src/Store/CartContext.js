import React from "react";

const CartContext = React.createContext({
  token: "",
  isLoggedIn: false,
  addItem: (token) => {},
  logout: () => {},
});

export default CartContext;
