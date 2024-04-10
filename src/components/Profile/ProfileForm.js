import classes from "./ProfileForm.module.css";
import CartContext from "../../Store/CartContext";
import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const enteredpasswordref = useRef();
  const cartcontext = useContext(CartContext);

  const submithandler = (event) => {
    event.preventDefault();
    const userpassword = enteredpasswordref.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLs-LedmGc81Xuup1BEqeFlfd9m_qBjX8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: cartcontext.token,
          password: userpassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      alert("Successfully password changed");
      cartcontext.logout();
      history.replace("/auth");
    });
  };
  return (
    <form className={classes.form} onSubmit={submithandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength={7}
          ref={enteredpasswordref}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
