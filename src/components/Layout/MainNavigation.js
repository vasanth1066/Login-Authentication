import { Link } from "react-router-dom";
import CartContext from "../../Store/CartContext";
import { useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";

const MainNavigation = () => {
  const history = useHistory();
  const cartcontext = useContext(CartContext);

  const isLoggedIn = cartcontext.isLoggedIn;

  const logoutHandler = (event) => {
    event.preventDefault();
    cartcontext.logout();
    history.replace("/");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
