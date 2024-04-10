import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const enteredemail = useRef();
  const enteredpassword = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submithandler = (event) => {
    event.preventDefault();
    const useremail = enteredemail.current.value;
    const userpassword = enteredpassword.current.value;

    setIsloading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLs-LedmGc81Xuup1BEqeFlfd9m_qBjX8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLs-LedmGc81Xuup1BEqeFlfd9m_qBjX8";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: useremail,
        password: userpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsloading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormesssage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errormesssage = data.error.message;
            }

            throw new Error(errormesssage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enteredemail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={enteredpassword} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request......</p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
